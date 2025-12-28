export interface Badge {
    id: string;
    label: string;
    icon: string; // Emoji character for now
    color: "cyan" | "purple" | "yellow" | "green";
    description: string;
}

export interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    level: number;
    badges: Badge[];
}

export interface Post {
    id: string;
    author: UserProfile;
    content: string;
    channel: string; // e.g., "geral", "projetos"
    likes: number;
    comments: number;
    timestamp: string;
    image?: string; // Optional attachment
}

const BADGES_DB: Record<string, Badge> = {
    founder: { id: "founder", label: "Membro Fundador", icon: "🛡️", color: "yellow", description: "Membros pioneiros da plataforma" },
    ia_expert: { id: "ia_expert", label: "Expert em IA", icon: "🤖", color: "purple", description: "Concluiu o curso de Agentes de IA" },
    vibe_coder: { id: "vibe_coder", label: "Vibe Coder", icon: "⚡", color: "cyan", description: "Criou um site usando Lovable" },
    oficina_pro: { id: "oficina_pro", label: "Oficina Pro", icon: "🔧", color: "green", description: "Especialista em Gestão de Oficina" }
};

export const MOCK_POSTS: Post[] = [
    {
        id: "post_1",
        author: {
            id: "u1",
            name: "Rafael Ribeiro",
            avatar: "https://github.com/shadcn.png",
            level: 12,
            badges: [BADGES_DB.founder, BADGES_DB.ia_expert]
        },
        content: "Acabeião de colocar meu primeiro Agente no ar! Ele já agendou 3 clientes hoje de manhã. Surreal a velocidade disso. 🚀",
        channel: "projetos-ia",
        likes: 24,
        comments: 5,
        timestamp: "2h atrás"
    },
    {
        id: "post_2",
        author: {
            id: "u2",
            name: "Ana Silva",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
            level: 5,
            badges: [BADGES_DB.vibe_coder]
        },
        content: "Galera, compartilhei no Vault o prompt que usei pra criar essa Landing Page de estética automotiva. Quem quiser usar, tá liberado!",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
        channel: "geral",
        likes: 42,
        comments: 12,
        timestamp: "4h atrás"
    }
];

export const CHANNELS = [
    { id: "geral", label: "💬 Geral" },
    { id: "projetos-ia", label: "🤖 Projetos de IA" },
    { id: "suporte-lovable", label: "⚡ Suporte Lovable" },
    { id: "networking", label: "🤝 Networking" }
];
