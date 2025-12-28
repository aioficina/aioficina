"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Lock, PlayCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { COURSES, Module, Lesson } from "@/lib/data/courses";
import Link from "next/link";

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const lessonId = params.lessonId as string;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // 1. Encontrar Curso, Módulo e Aula Atual
    const course = COURSES.find(c => c.id === courseId);

    // Flatten all lessons to find current index easier
    const allLessons: { lesson: Lesson; moduleTitle: string }[] = [];
    course?.modules.forEach(mod => {
        mod.lessons.forEach(less => {
            allLessons.push({ lesson: less, moduleTitle: mod.title });
        });
    });

    const currentIndex = allLessons.findIndex(item => item.lesson.id === lessonId);
    const currentItem = allLessons[currentIndex];

    if (!course || !currentItem) {
        return <div className="p-10 text-center text-red-500">Aula não encontrada</div>;
    }

    const { lesson, moduleTitle } = currentItem;
    const nextLesson = allLessons[currentIndex + 1];
    const prevLesson = allLessons[currentIndex - 1];

    const handleNext = () => {
        if (nextLesson) {
            router.push(`/cursos/${courseId}/aulas/${nextLesson.lesson.id}`);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-black text-white relative">

            {/* Main Player Area */}
            <div className={cn(
                "flex-1 flex flex-col h-full transition-all duration-300",
                isSidebarOpen ? "mr-80" : "mr-0"
            )}>
                {/* Top Bar Navigation */}
                <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
                    <Link href={`/cursos/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                        <ArrowLeft size={16} /> Voltar ao Curso
                    </Link>
                    <div className="h-4 w-px bg-white/10" />
                    <h1 className="font-semibold text-lg line-clamp-1 flex-1">{lesson.title}</h1>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-white">
                        <Menu />
                    </button>
                </div>

                {/* Video Container */}
                <div className="flex-1 bg-black relative flex items-center justify-center group">
                    {/* Mock Video Placeholder */}
                    <div className="w-full h-full max-h-[80vh] aspect-video bg-zinc-900 shadow-2xl relative overflow-hidden">
                        {/* Simulated Thumbnail Background */}
                        <img
                            src={lesson.thumbnail}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity"
                        />

                        {/* Big Play Button Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(99,102,241,0.5)] z-10 hover:bg-primary transition-colors"
                            >
                                <PlayCircle size={40} className="fill-white text-white" />
                            </motion.button>
                            <p className="mt-4 text-gray-400 font-medium">Simulação de Player de Vídeo</p>
                        </div>

                        {/* Simulated Controls Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent flex items-end px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-full space-y-2">
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                                    <div className="w-[30%] h-full bg-primary" />
                                </div>
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>04:20 / {lesson.duration}</span>
                                    <span>1080p</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 border-t border-white/10 bg-card flex justify-between items-center z-10">
                    <div className="flex gap-4">
                        {prevLesson && (
                            <Link
                                href={`/cursos/${courseId}/aulas/${prevLesson.lesson.id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/40 text-gray-300 rounded-lg transition-colors text-sm"
                            >
                                <ChevronLeft size={16} /> Anterior
                            </Link>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="flex items-center gap-2 px-6 py-2.5 bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-600/20 rounded-lg font-medium transition-colors group"
                        >
                            <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
                            Marcar como Concluída
                        </button>

                        {nextLesson && (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20"
                            >
                                Próxima Aula <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Playlist */}
            <motion.aside
                initial={{ x: 320 }}
                animate={{ x: isSidebarOpen ? 0 : 320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-80 h-full fixed right-0 top-16 bg-card border-l border-white/10 flex flex-col z-20 shadow-2xl"
            >
                <div className="p-4 border-b border-white/10 bg-zinc-900">
                    <h3 className="font-bold text-gray-200">Conteúdo do Curso</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        {currentIndex + 1} de {allLessons.length} aulas
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto pb-20">
                    {course.modules.map(module => (
                        <div key={module.id} className="border-b border-white/5 last:border-0">
                            <div className="px-4 py-3 bg-zinc-900/50 font-bold text-xs text-gray-400 sticky top-0 backdrop-blur-sm z-10 border-b border-white/5">
                                {module.title.toUpperCase()}
                            </div>
                            {module.lessons.map((item) => {
                                const isActive = item.id === lessonId;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.isLocked ? "#" : `/cursos/${courseId}/aulas/${item.id}`}
                                        className={cn(
                                            "flex gap-3 p-4 hover:bg-white/5 transition-colors items-start group relative border-l-2",
                                            isActive ? "bg-white/5 border-primary" : "border-transparent",
                                            item.isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                        )}
                                    >
                                        <div className="mt-1">
                                            {isActive ? (
                                                <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                                </div>
                                            ) : item.isLocked ? (
                                                <Lock size={16} />
                                            ) : (
                                                <PlayCircle size={16} className="text-gray-500 group-hover:text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn("text-sm font-medium leading-tight mb-1", isActive ? "text-primary" : "text-gray-200")}>
                                                {item.title}
                                            </p>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                {item.duration}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </motion.aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
