"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Github, Zap, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setIsLoading(false);
            setError("Email ou senha incorretos.");
            return;
        }

        router.push("/");
        router.refresh(); // Atualiza os componentes server-side
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                throw error;
            }
            // User will be redirected to Google, so we don't need to do anything else here
        } catch (error) {
            console.error("Error logging in with Google:", error);
            setError("Erro ao conectar com Google. Tente novamente.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background z-0" />
            <div className="absolute w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -top-40 -left-20 animate-pulse" />
            <div className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] bottom-0 right-0" />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center mb-6"
                        >
                            <img src="/logo.png" alt="Aioficina" className="h-16 w-auto" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Bem-vindo de volta
                        </h1>
                        <p className="text-muted-foreground mt-2">Acesse sua área exclusiva Aioficina</p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="w-full bg-secondary/50 border border-white/5 rounded-xl px-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-secondary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Senha</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-secondary/50 border border-white/5 rounded-xl px-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-secondary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                                <input type="checkbox" className="rounded border-gray-600 bg-secondary/50 text-primary focus:ring-primary" />
                                Lembrar de mim
                            </label>
                            <Link href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
                                Esqueceu a senha?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Entrar <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Ou continue com</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                                <Github size={18} /> Github
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="font-bold">G</span> Google
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Ainda não é membro? <a href="#" className="text-primary hover:underline">Inscreva-se na Kiwify</a>
                </p>
            </motion.div>
        </div>
    );
}
