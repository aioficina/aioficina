"use client";

import { ServiceCard } from "@/components/market/ServiceCard";
import { MARKET_SERVICES } from "@/lib/data/market";
import { Search, Filter, Rocket } from "lucide-react";

export default function MarketPage() {
    return (
        <div className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-8">
            {/* Header / Hero Market */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
                            Talentos da <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aioficina</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Precisa de ajuda para implementar? Contrate um aluno certificado.
                            <br />Ou divulgue seus serviços se você já é um Expert.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar serviços (ex: Agente WhatsApp)..."
                                    className="w-full bg-black/50 border border-white/20 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <Rocket size={20} /> Oferecer Serviço
                            </button>
                        </div>
                    </div>

                    {/* Decoration */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Filters (Visual Only) */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4 overflow-x-auto pb-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-lg whitespace-nowrap">
                    <Filter size={16} /> Todos
                </button>
                {["Automação", "Design & Lovable", "Gestão", "Copywriting"].map(cat => (
                    <button key={cat} className="px-4 py-2 bg-zinc-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded-lg whitespace-nowrap transition-colors font-medium">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MARKET_SERVICES.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
}
