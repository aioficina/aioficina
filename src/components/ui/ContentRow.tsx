"use client";

import { motion } from "framer-motion";
import { PlayCircle, Clock, Star } from "lucide-react";
import Link from "next/link"; // Import Link

interface ContentCardProps {
    id: string; // Added ID for linking
    title: string;
    category: string;
    duration: string;
    thumbnailColor: string;
    isNew?: boolean; // New badge
}

const DUMMY_DATA: ContentCardProps[] = [
    { id: "agentes-ia", title: "Agentes de IA para Atendimento", category: "Automação", duration: "4h 30m", thumbnailColor: "from-blue-600 to-indigo-900", isNew: true },
    { id: "sites-lovable", title: "Sites com Lovable (Vibe Coding)", category: "Dev & Design", duration: "3h 15m", thumbnailColor: "from-cyan-500 to-blue-500", isNew: true },
    { id: "gestao-oficina", title: "Gestão Financeira de Oficinas", category: "Negócios", duration: "1h 20m", thumbnailColor: "from-emerald-600 to-green-900" },
    { id: "marketing-auto", title: "Marketing para Oficinas", category: "Marketing", duration: "2h 10m", thumbnailColor: "from-orange-600 to-red-900" },
];

export function ContentRow({ title }: { title: string }) {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Ver tudo</button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-2 px-2">
                {DUMMY_DATA.map((item, index) => (
                    <Link href={`/cursos/${item.id}`} key={index}>
                        <motion.div
                            className="flex-none w-[280px] group cursor-pointer"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Thumbnail */}
                            <div className={`h-[160px] rounded-xl bg-gradient-to-br ${item.thumbnailColor} relative overflow-hidden shadow-lg mb-3`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <PlayCircle className="text-white fill-white/20" size={32} />
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2">
                                    {item.isNew && (
                                        <span className="px-2 py-1 bg-red-600 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                                            NOVO
                                        </span>
                                    )}
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-bold text-white flex items-center gap-1">
                                        <Star size={10} className="text-yellow-400 fill-yellow-400" /> 5.0
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="font-bold text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-white/5">{item.category}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {item.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
