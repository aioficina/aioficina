"use client";

import { motion } from "framer-motion";
import { Home, PlayCircle, Trophy, Newspaper, Settings, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: PlayCircle, label: "Aulas", href: "/aulas" },
    { icon: Newspaper, label: "Notícias", href: "/noticias" },
    { icon: Trophy, label: "Conquistas", href: "/conquistas" },
];

export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.aside
            initial={{ width: 80 }}
            animate={{ width: isExpanded ? 240 : 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-screen bg-card border-r border-border fixed left-0 top-0 z-50 flex flex-col justify-between py-6"
        >
            {/* Header / Logo Area */}
            <div className="px-4 mb-8 flex items-center justify-between">
                <div className={cn("flex items-center gap-2 overflow-hidden", !isExpanded && "justify-center w-full")}>
                    {/* Logo Placeholder */}
                    <div className="w-8 h-8 rounded-lg bg-primary flex-shrink-0 flex items-center justify-center font-bold text-primary-foreground">
                        AO
                    </div>
                    {isExpanded && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap"
                        >
                            Aioficina
                        </motion.span>
                    )}
                </div>
            </div>

            {/* Toggle Button (Optional, can be removed if hover based) */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-8 bg-primary text-primary-foreground p-1 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                <Menu size={14} />
            </button>

            {/* Menu Items */}
            <nav className="flex-1 px-2 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-4 px-3 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group",
                            !isExpanded && "justify-center"
                        )}
                    >
                        <item.icon size={24} className="group-hover:text-primary transition-colors" />
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
                        "flex items-center gap-4 px-3 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
                        !isExpanded && "justify-center"
                    )}
                >
                    <Settings size={24} />
                    {isExpanded && <span>Configurações</span>}
                </Link>
                <button
                    className={cn(
                        "flex items-center gap-4 px-3 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors w-full",
                        !isExpanded && "justify-center"
                    )}
                >
                    <LogOut size={24} />
                    {isExpanded && <span>Sair</span>}
                </button>
            </div>
        </motion.aside>
    );
}
