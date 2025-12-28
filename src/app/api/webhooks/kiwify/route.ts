import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Inicializa o cliente com permissão de ADMIN (Service Role)
// É necessário permissão de admin para criar usuários sem que eles confirmem email manualmente na hora (signInWithPassword dps)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Tipagem simplificada do Payload da Kiwify
interface KiwifyPayload {
    order_id: string;
    order_status: "paid" | "refunded" | "chargedback" | "waiting_payment";
    customer: {
        full_name: string;
        email: string;
    };
    webhook_token?: string;
}

const KIWIFY_SECRET_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN;

export async function POST(request: Request) {
    try {
        const payload: KiwifyPayload = await request.json();

        // 1. Validação de Token
        const url = new URL(request.url);
        const tokenFromQuery = url.searchParams.get("token");

        if (tokenFromQuery !== KIWIFY_SECRET_TOKEN) {
            console.warn("Tentativa não autorizada - Token inválido");
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // 2. Processar Pagamento Aprovado
        if (payload.order_status === "paid") {
            const email = payload.customer.email;
            const fullName = payload.customer.full_name;

            console.log(`✅ Webhook: Processando venda para ${email}`);

            // a) Verificar se usuário já existe
            const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
            const userExists = existingUser.users.find(u => u.email === email);

            if (userExists) {
                console.log("-> Usuário já existe. Apenas garantindo acesso.");
                // Aqui poderia atualizar alguma flag "active" na tabela profiles
                return NextResponse.json({ message: "Usuário já existe" }, { status: 200 });
            }

            // b) Criar Usuário no Supabase Auth
            // Gerar senha aleatória temporária (o ideal seria enviar um email de reset de senha)
            const tempPassword = Math.random().toString(36).slice(-8) + "Ai#";

            const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                email: email,
                password: tempPassword,
                email_confirm: true, // Já confirma o email pois pagou
                user_metadata: { full_name: fullName }
            });

            if (createError) {
                console.error("Erro ao criar usuário Auth:", createError);
                return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
            }

            if (newUser.user) {
                // c) Criar Registro na Tabela Profiles (Gamificação)
                const { error: profileError } = await supabaseAdmin
                    .from('profiles')
                    .insert([
                        {
                            id: newUser.user.id,
                            full_name: fullName,
                            xp: 0,
                            level: 1
                        }
                    ]);

                if (profileError) {
                    console.error("Erro ao criar Profile:", profileError);
                } else {
                    console.log("-> Profile de gamificação criado com sucesso!");
                }

                // TODO: Enviar email para o cliente com a senha temporária
                // (Isso requer integração com Resend ou SMTP)
                console.log(`-> USUÁRIO CRIADO: ${email} | SENHA TEMP: ${tempPassword}`);
            }

            return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 200 });
        }

        // 3. Reembolso (Bloqueio)
        if (payload.order_status === "refunded" || payload.order_status === "chargedback") {
            console.log(`🚫 Bloqueando usuário: ${payload.customer.email}`);

            const { data: list } = await supabaseAdmin.auth.admin.listUsers();
            const userToBan = list.users.find(u => u.email === payload.customer.email);

            if (userToBan) {
                await supabaseAdmin.auth.admin.updateUserById(userToBan.id, { ban_duration: "876000h" }); // Banido por 100 anos
            }

            return NextResponse.json({ message: "Acesso revogado" }, { status: 200 });
        }

        return NextResponse.json({ message: "Status ignorado" }, { status: 200 });

    } catch (error) {
        console.error("Erro fatal no webhook:", error);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
