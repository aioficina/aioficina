"use client";

import { motion } from "framer-motion";
import { Home, PlayCircle, Trophy, Newspaper, Settings, Menu, LogOut, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: PlayCircle, label: "Treinamentos", href: "/aulas" },
    { icon: Newspaper, label: "Notícias", href: "/noticias" },
    { icon: Trophy, label: "Conquistas", href: "/conquistas" },
    { icon: Users, label: "Comunidade", href: "/comunidade" },
    { icon: Briefcase, label: "Talentos", href: "/mercado" },
];

export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.aside
            initial={{ width: 80 }}
            animate={{ width: isExpanded ? 240 : 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="h-screen bg-card border-r border-border fixed left-0 top-0 z-50 flex flex-col justify-between py-6 shadow-2xl"
        >
            {/* Header / Logo Area */}
            <div className="px-4 mb-8 flex items-center justify-between">
                {/* Header / Logo Area */}
                <div className="px-4 mb-8 flex items-center justify-between">
                    <div className={cn("flex items-center gap-2 overflow-hidden transition-all duration-300",
                        !isExpanded ? "justify-center w-full" : "justify-start"
                    )}>
                        {/* 
                        Logo Logic:
                        - Collapsed: We want to show just the 'Icon' (left part).
                        - Expanded: Full logo.
                    */}
                        <div className={cn("relative transition-all duration-300 flex-shrink-0",
                            isExpanded ? "w-32 h-10" : "w-10 h-10 overflow-hidden"
                        )}>
                            <img
                                src="/logo.png"
                                alt="Aioficina"
                                className={cn("h-full object-contain transition-all duration-300",
                                    isExpanded ? "w-full object-left" : "w-[300%] max-w-none object-left" // Zoom/Shift to show just the A when collapsed
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-2 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-4 px-3 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group whitespace-nowrap overflow-hidden",
                            !isExpanded && "justify-center"
                        )}
                    >
                        <item.icon size={24} className="group-hover:text-primary transition-colors flex-shrink-0" />
                        {isExpanded && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-medium"
                            >
                                {item.label}
                            </motion.span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Footer / Settings */}
            <div className="px-2 space-y-2">
                <Link
                    href="/configuracoes"
                    className={cn(
                        "flex items-center gap-4 px-3 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors whitespace-nowrap overflow-hidden",
                        !isExpanded && "justify-center"
                    )}
                >
                    <Settings size={24} className="flex-shrink-0" />
                    {isExpanded && <span>Configurações</span>}
                </Link>
                <button
                    className={cn(
                        "flex items-center gap-4 px-3 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors w-full whitespace-nowrap overflow-hidden",
                        !isExpanded && "justify-center"
                    )}
                >
                    <LogOut size={24} className="flex-shrink-0" />
                    {isExpanded && <span>Sair</span>}
                </button>
            </div>
        </motion.aside>
    );
}
