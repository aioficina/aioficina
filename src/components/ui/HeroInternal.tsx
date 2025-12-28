"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import Link from "next/link";

export function HeroInternal() {
    return (
        <div className="relative w-full h-[60vh] min-h-[500px] rounded-3xl overflow-hidden mb-10 group">
            {/* Background Image Placeholder (Gradient/Pattern) */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                {/* Simulated Video Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/20 blur-[100px] rounded-full"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-12 flex items-end">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                        Novidade
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
                        Masterclass <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Automação IA
                        </span>
                    </h1>
                    <p className="text-lg text-gray-300 line-clamp-3">
                        Descubra como transformar sua oficina com agentes autônomos que atendem, agendam e vendem 24/7. Uma imersão completa na nova era da produtividade.
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <Link href="/cursos/1" className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                            <Play className="fill-black" size={20} />
                            Assistir Agora
                        </Link>
                        <button className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 backdrop-blur-md transition-colors">
                            <Info size={20} />
                            Mais Detalhes
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
