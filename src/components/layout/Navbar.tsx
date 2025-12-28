"use client";

import { motion } from "framer-motion";
import { Bell, Search, Star, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Fetch User Data
        async function getUserData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch Profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('xp, level, full_name')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setXp(profile.xp || 0);
                    setLevel(profile.level || 1);
                    setUserName(profile.full_name || user.email);
                }
            }
            setLoading(false);
        }

        getUserData();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    // Calcular progresso para o próximo nível (Exemplo simples: 1000 XP por nível)
    const xpForNextLevel = 1000 * level;
    const progressPercentage = Math.min((xp / xpForNextLevel) * 100, 100);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-40 h-16 px-8 flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            {/* Esquerda: Breadcrumb ou Título (Opcional, deixei vazio para manter limpo estilo Netflix) */}
            <div className="flex-1" />

            <div className="flex items-center gap-6">

                {/* Gamification Status - Only show if loaded */}
                {!loading && (
                    <div className="flex items-center gap-3 bg-secondary/50 px-3 py-1.5 rounded-full border border-white/5">
                        <div className="p-1 bg-yellow-500/20 rounded-full">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex flex-col min-w-[100px]">
                            <span className="text-xs font-bold text-muted-foreground uppercase leading-none flex justify-between">
                                <span>Nível {level}</span>
                                <span className="text-[10px] opacity-70">{xp}/{xpForNextLevel}</span>
                            </span>
                            <div className="w-full h-1.5 bg-secondary mt-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                    {/* Search */}
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                        <Search size={20} />
                    </button>

                    {/* Notifications */}
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
                    </button>

                    {/* Profile */}
                    <div className="group relative flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold leading-none">{userName || "Visitante"}</p>
                            <p className="text-xs text-muted-foreground">Membro Premium</p>
                        </div>

                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple-500 overflow-hidden border-2 border-transparent hover:border-foreground transition-all duration-300">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || "Felix"}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Dropdown (Logout) - Simples via hover */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                                <LogOut size={16} /> Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
