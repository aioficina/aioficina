"use client";

import { CreatePost } from "@/components/community/CreatePost";
import { PostCard } from "@/components/community/PostCard";
import { CHANNELS, MOCK_POSTS } from "@/lib/data/community";
import { Hash, Users, Crown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
    const [activeChannel, setActiveChannel] = useState("geral");

    // Filter posts (in a real app, this would be an API call)
    const posts = activeChannel === "geral"
        ? MOCK_POSTS
        : MOCK_POSTS.filter(p => p.channel === activeChannel);

    return (
        <div className="min-h-screen bg-black pt-20 pb-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* LEFT SIDEBAR - CHANNELS */}
                <div className="hidden md:block md:col-span-3 lg:col-span-2">
                    <div className="sticky top-24 space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Canais</h3>
                            <div className="space-y-1">
                                {CHANNELS.map(channel => (
                                    <button
                                        key={channel.id}
                                        onClick={() => setActiveChannel(channel.id)}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors",
                                            activeChannel === channel.id
                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <Hash size={16} /> {channel.label.replace(/[^a-zA-Z0-9 ]/g, '')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Membros</h3>
                            <div className="flex items-center gap-2 px-3 text-gray-400 text-sm">
                                <Users size={16} /> 142 Online
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN FEED */}
                <main className="col-span-1 md:col-span-9 lg:col-span-7">
                    <div className="flex items-center justify-between mb-6 md:hidden">
                        <h1 className="text-xl font-bold text-white">Comunidade</h1>
                        {/* Mobile Channel Dropdown could go here */}
                    </div>

                    <CreatePost />

                    <div className="space-y-4">
                        {posts.length > 0 ? (
                            posts.map(post => <PostCard key={post.id} post={post} />)
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                Nenhum post neste canal ainda. Seja o primeiro!
                            </div>
                        )}
                    </div>
                </main>

                {/* RIGHT SIDEBAR - HIGHLIGHTS */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 bg-zinc-900/30 border border-white/5 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Crown size={18} className="text-yellow-500" /> Top Membros
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center text-[10px] text-yellow-500 font-bold border border-zinc-800">
                                            {i}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse mb-1" />
                                        <div className="h-2 w-12 bg-zinc-800/50 rounded animate-pulse" />
                                    </div>
                                    <div className="text-xs font-mono text-primary">12k XP</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <p className="text-xs text-gray-500 text-center">
                                Complete cursos para subir no ranking e ganhar badges exclusivas!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
