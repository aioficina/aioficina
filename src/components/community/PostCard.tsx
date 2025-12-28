"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Post } from "@/lib/data/community";
import { cn } from "@/lib/utils";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 mb-4 hover:border-white/10 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-zinc-800" />
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-white text-base hover:underline cursor-pointer">{post.author.name}</h3>
                            <span className="text-xs text-gray-500">• {post.timestamp}</span>
                        </div>

                        {/* BADGES / TAGS */}
                        <div className="flex gap-1.5 mt-1">
                            {post.author.badges.map((badge) => (
                                <span
                                    key={badge.id}
                                    className={cn(
                                        "px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide flex items-center gap-1 cursor-help",
                                        badge.color === 'yellow' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                                        badge.color === 'purple' && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                        badge.color === 'cyan' && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                                        badge.color === 'green' && "bg-green-500/10 text-green-400 border border-green-500/20",
                                    )}
                                    title={badge.description}
                                >
                                    {badge.icon} {badge.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="text-gray-500 hover:text-white p-1">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="text-gray-200 leading-relaxed mb-4 whitespace-pre-wrap">
                {post.content}
            </div>

            {post.image && (
                <div className="rounded-lg overflow-hidden mb-4 border border-white/10">
                    <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-[400px]" />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm group">
                    <Heart size={18} className="group-hover:fill-current" />
                    {post.likes}
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors text-sm">
                    <MessageSquare size={18} />
                    {post.comments}
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm ml-auto">
                    <Share2 size={18} />
                    Compartilhar
                </button>
            </div>
        </div>
    );
}
