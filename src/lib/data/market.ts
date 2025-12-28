
export interface Service {
    id: string;
    server_id: string; // The user offering the service
    server_name: string;
    server_avatar: string;
    server_badges: string[]; // e.g. "Vibe Coder" to show authority
    title: string;
    description: string;
    price_range: string; // e.g., "R$ 500 - R$ 1.000"
    category: "automacao" | "design" | "copy" | "gestao";
    thumbnail: string;
    rating: number;
}

export const MARKET_SERVICES: Service[] = [
    {
        id: "serv_1",
        server_id: "u_1",
        server_name: "Ana Beatriz",
        server_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        server_badges: ["Vibe Coder", "Lovable Expert"],
        title: "Crio sua Landing Page Automotiva em 24h",
        description: "Landing pages de alta conversão usando Lovable e V6. Foco em estética dark mode premium.",
        price_range: "A partir de R$ 400",
        category: "design",
        thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=640",
        rating: 5.0
    },
    {
        id: "serv_2",
        server_id: "u_2",
        server_name: "Carlos Mendes",
        server_avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
        server_badges: ["IA Expert"],
        title: "Agente de Atendimento WhatsApp (Básico)",
        description: "Configuro seu n8n para responder dúvidas frequentes e agendar horários automaticamente.",
        price_range: "R$ 1.500 (Setup)",
        category: "automacao",
        thumbnail: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=640",
        rating: 4.8
    },
    {
        id: "serv_3",
        server_id: "u_3",
        server_name: "Oficina Master",
        server_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        server_badges: ["Oficina Pro"],
        title: "Consultoria de Gestão Financeira",
        description: "Análise completa do fluxo de caixa e precificação de serviços da sua oficina.",
        price_range: "Sob Consulta",
        category: "gestao",
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=640",
        rating: 5.0
    }
];
