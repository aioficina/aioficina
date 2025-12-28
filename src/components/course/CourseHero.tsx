"use client";

import { motion } from "framer-motion";
import { Play, Plus, ThumbsUp, Volume2 } from "lucide-react";

interface CourseHeroProps {
    title: string;
    description: string;
    coverUrl?: string; // Optional, defaults to gradient
    tags?: string[];
    matchPercentage?: number;
}

export function CourseHero({
    title,
    description,
    tags = ["Produção", "Gestão", "2024"],
    matchPercentage = 98
}: CourseHeroProps) {
    return (
        <div className="relative w-[100vw] left-[calc(-50vw+50%)] h-[70vh] min-h-[500px] mb-8 group">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/60 via-transparent to-black z-0" />

            {/* Fallback pattern/image */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-[5]" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-2xl space-y-6"
                >
                    {/* Logo/Title visual treatment */}
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                        {title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-green-400 font-bold">{matchPercentage}% Relevante</span>
                        <span className="text-gray-300">2024</span>
                        <div className="flex gap-2">
                            <span className="border border-white/40 rounded px-1 text-xs py-0.5 text-gray-300">HD</span>
                            <span className="border border-white/40 rounded px-1 text-xs py-0.5 text-gray-300">5.1</span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-200 line-clamp-3 md:line-clamp-4 drop-shadow-md leading-relaxed">
                        {description}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-white/90 text-black font-bold rounded-md hover:scale-105 transition-all text-lg mb-2">
                            <Play className="fill-black" size={24} />
                            Assistir
                        </button>

                        <button className="p-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full transition-colors mb-2">
                            <Plus size={24} />
                        </button>

                        <button className="p-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full transition-colors mb-2">
                            <ThumbsUp size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                        <span className="text-gray-300">Gêneros:</span>
                        {tags.map((tag, i) => (
                            <span key={i} className="hover:text-white cursor-pointer transition-colors">
                                {tag}{i < tags.length - 1 ? "," : ""}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right side fade (Vignette) */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Mute button placeholder */}
            <div className="absolute bottom-[30%] right-16 z-30 hidden md:block">
                <div className="p-2 border border-white/30 rounded-full bg-black/20 backdrop-blur-sm text-white/70">
                    <Volume2 size={20} />
                </div>
            </div>
        </div>
    );
}
