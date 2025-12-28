
export interface Lesson {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    description: string;
    isLocked?: boolean;
}

export interface Module {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
}

export interface VaultCategory {
    title: string;
    items: {
        label: string;
        type: "link" | "command" | "copy";
        value: string; // The URL or the Text to Copy
    }[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    tags: string[];
    coverUrl?: string; // Optional
    modules: Module[];
    vault?: VaultCategory[]; // Optional feature for specific courses
}

export const COURSES: Course[] = [
    {
        id: "agentes-ia",
        title: "Agentes de IA para Atendimento",
        description: "Substitua o suporte humano repetitivo por automação inteligente. Aprenda a criar o 'Atendente 24/7' com base de conhecimento (RAG), integração Omnichannel (WhatsApp, Instagram) e transbordo humano estratégico.",
        tags: ["Automação", "WhatsApp", "RAG", "Vendas"],
        modules: [
            {
                id: "mod_1",
                title: "Arquitetura do Agente",
                description: "Definição de escopo, tom de voz e base de conhecimento.",
                lessons: [
                    {
                        id: "aula_1",
                        title: "O Cérebro do Agente",
                        duration: "15m",
                        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=640",
                        description: "Configurando as instruções mestras para evitar alucinações e manter a persona."
                    },
                    {
                        id: "aula_2",
                        title: "Base de Conhecimento (RAG)",
                        duration: "22m",
                        thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=640",
                        description: "Como estruturar PDFs e textos para o agente consultar."
                    }
                ]
            },
            {
                id: "mod_2",
                title: "Integração Omnichannel",
                lessons: [
                    {
                        id: "aula_3",
                        title: "Conexão WhatsApp & Instagram",
                        duration: "30m",
                        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=640",
                        description: "Colocando o agente nos canais onde o cliente está."
                    },
                    {
                        id: "aula_4",
                        title: "Regras de Transbordo Humano",
                        duration: "18m",
                        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=640",
                        description: "Quando e como passar o chat para um atendente real."
                    }
                ]
            },
            {
                id: "mod_3",
                title: "Métricas e Otimização",
                lessons: [
                    {
                        id: "aula_5",
                        title: "Métricas de Conversão",
                        duration: "25m",
                        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=640",
                        description: "Como medir se o seu agente está fechando vendas ou apenas tirando dúvidas.",
                        isLocked: true
                    }
                ]
            }
        ]
    },
    {
        id: "sites-lovable",
        title: "Sites de Alta Conversão com Lovable",
        description: "Crie interfaces profissionais e funcionais em minutos com Vibe Coding. Do setup inicial à publicação com domínio próprio e integração com Supabase.",
        tags: ["Lovable", "Design", "Supabase", "Frontend"],
        vault: [
            {
                title: "Templates de Prompt",
                items: [
                    { label: "Prompt para Landing Page de Vendas", type: "copy", value: "Crie uma Landing Page moderna para um produto SaaS com Hero Section, Features, Pricing e FAQ. Use TailwindCSS..." },
                    { label: "Prompt para Dashboard Admin", type: "copy", value: "Crie um Dashboard administrativo com Sidebar escura, Gráficos usando Recharts e Tabela de Usuários..." },
                    { label: "Prompt para E-commerce Minimalista", type: "copy", value: "Crie uma vitrine de produtos estilo Apple, com fundo branco, tipografia Inter e imagens grandes..." }
                ]
            },
            {
                title: "Scripts Específicos",
                items: [
                    { label: "Botão Flutuante WhatsApp", type: "copy", value: "<a href='https://wa.me/...' class='fixed bottom-4 right-4...'>WhatsApp</a>" },
                    { label: "Pixel do Facebook", type: "link", value: "https://developers.facebook.com/docs/meta-pixel/" },
                    { label: "Pop-up de Captura de Lead", type: "copy", value: "Componente React para Modal de Newsletter..." }
                ]
            },
            {
                title: "Recursos Visuais",
                items: [
                    { label: "Banco de Ícones (Lucide)", type: "link", value: "https://lucide.dev" },
                    { label: "Gerador de Paletas (Coolors)", type: "link", value: "https://coolors.co" },
                    { label: "Ilustrações Open Source", type: "link", value: "https://undraw.co" }
                ]
            },
            {
                title: "Conexões Externas",
                items: [
                    { label: "Webhook Kiwify -> Supabase", type: "link", value: "/docs/kiwify-webhook" },
                    { label: "Automação n8n", type: "link", value: "https://n8n.io" }
                ]
            }
        ],
        modules: [
            {
                id: "mod_lov_1",
                title: "Fundamentos do Vibe Coding",
                lessons: [
                    {
                        id: "aula_lov_1",
                        title: "Setup Lovable & GitHub",
                        duration: "12m",
                        thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=640",
                        description: "Primeiros passos e conexão segura com seu repositório."
                    },
                    {
                        id: "aula_lov_2",
                        title: "Engenharia de Prompt para UI",
                        duration: "20m",
                        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=640",
                        description: "Como descrever layouts para que a IA entregue design limpo e funcional."
                    }
                ]
            },
            {
                id: "mod_lov_2",
                title: "Design System & Backend",
                lessons: [
                    {
                        id: "aula_lov_3",
                        title: "Criando o Arquivo de Regras",
                        duration: "15m",
                        thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=640",
                        description: "Padronizando a identidade visual em todas as páginas."
                    },
                    {
                        id: "aula_lov_4",
                        title: "Conectando ao Supabase",
                        duration: "28m",
                        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=640",
                        description: "Criando tabelas e formulários funcionais direto pelo Lovable."
                    }
                ]
            },
            {
                id: "mod_lov_3",
                title: "Publicação",
                lessons: [
                    {
                        id: "aula_lov_5",
                        title: "Deploy na Vercel & Domínios",
                        duration: "10m",
                        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=640",
                        description: "Tirando o site do ambiente de teste e colocando no ar com marca própria.",
                        isLocked: true
                    }
                ]
            }
        ]
    }
];
