"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Lesson {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    description: string;
    isLocked?: boolean;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface ModuleListProps {
    modules: Module[];
    courseId: string;
}

export function ModuleList({ modules, courseId }: ModuleListProps) {
    const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id);

    // Find active module data safely
    const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
            {/* Module Selector (Header) */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Episódios
                    <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                        {activeModule.lessons.length} aulas
                    </span>
                </h2>

                {/* Custom Select / Tabs for Modules */}
                <div className="relative group">
                    <select
                        value={activeModuleId}
                        onChange={(e) => setActiveModuleId(e.target.value)}
                        className="appearance-none bg-black border border-white/30 text-lg font-bold text-white py-2 pl-4 pr-10 rounded hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        {modules.map((module) => (
                            <option key={module.id} value={module.id} className="bg-zinc-900 text-base">
                                {module.title}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            {/* Modern Grid Layout for Lessons */}
            <motion.div
                key={activeModuleId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4"
            >
                {activeModule.lessons.map((lesson, index) => (
                    <Link
                        href={lesson.isLocked ? "#" : `/cursos/${courseId}/aulas/${lesson.id}`}
                        key={lesson.id}
                        className={cn(
                            "flex flex-col md:flex-row gap-4 p-4 rounded-xl transition-all duration-300 group border border-transparent",
                            lesson.isLocked
                                ? "opacity-60 cursor-not-allowed bg-transparent"
                                : "hover:bg-zinc-900/50 cursor-pointer hover:border-white/5"
                        )}
                    >
                        {/* Visual Numbering + Thumbnail */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="text-2xl font-bold text-gray-500 w-6 group-hover:text-primary transition-colors">
                                {index + 1}
                            </span>

                            <div className="relative w-40 h-24 md:w-48 md:h-28 rounded-lg overflow-hidden bg-zinc-800 shadow-lg">
                                <img
                                    src={lesson.thumbnail}
                                    alt={lesson.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors">
                                    {lesson.isLocked ? (
                                        <Lock className="text-white/50" />
                                    ) : (
                                        <PlayCircle className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" size={32} />
                                    )}
                                </div>
                                {/* Progress Bar (Fake for now) */}
                                {!lesson.isLocked && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                        <div className="h-full bg-primary w-[30%]" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info Content */}
                        <div className="flex flex-col justify-center flex-1 border-b border-white/5 md:border-0 pb-4 md:pb-0">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-base font-bold text-gray-100 group-hover:text-white leading-tight">
                                    {lesson.title}
                                </h3>
                                <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                                    <Clock size={12} /> {lesson.duration}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                {lesson.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}
