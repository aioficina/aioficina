"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal, ThumbsUp } from "lucide-react";
import { Post } from "@/lib/data/community";
import { cn } from "@/lib/utils";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl mb-4 overflow-hidden hover:border-white/10 transition-colors">
            {/* Header */}
            <div className="p-4 pl-4 pr-2 flex justify-between items-start">
                <div className="flex gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-zinc-700 cursor-pointer hover:opacity-80 transition-opacity" />
                    <div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-white text-[15px] hover:underline cursor-pointer leading-tight">{post.author.name}</h3>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 hover:underline cursor-pointer">{post.timestamp}</span>
                                <span className="text-gray-600 text-[10px]">•</span>
                                <span className="text-gray-500 text-xs">🌎</span>
                            </div>
                        </div>

                        {/* BADGES moved to be a bit more subtle if needed, or kept here. 
                            Let's keep them small below or next to name. The social feed usually doesn't have badges this prominent, 
                            but for a membership site they are important. 
                        */}
                    </div>
                </div>

                <div className="flex items-center">
                    {/* Badges Inline small */}
                    <div className="flex gap-1 mr-2 hidden sm:flex">
                        {post.author.badges.slice(0, 2).map((badge) => (
                            <span
                                key={badge.id}
                                className={cn(
                                    "px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wide flex items-center gap-1 cursor-help opacity-70 hover:opacity-100 transition-opacity",
                                    badge.color === 'yellow' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                                    badge.color === 'purple' && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                    badge.color === 'cyan' && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                                    badge.color === 'green' && "bg-green-500/10 text-green-400 border border-green-500/20",
                                )}
                                title={badge.description}
                            >
                                {badge.label}
                            </span>
                        ))}
                    </div>

                    <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2 text-white/90 text-[15px] leading-6 whitespace-pre-wrap">
                {post.content}
            </div>

            {/* Media */}
            {post.image && (
                <div className="mt-2 text-center bg-black">
                    {/* Centered image container like FB */}
                    <img src={post.image} alt="Post attachment" className="w-full h-auto max-h-[600px] object-contain mx-auto" />
                </div>
            )}

            {/* Metrics Row (Likes/Comments count) */}
            <div className="px-4 py-3 flex items-center justify-between text-xs text-gray-500 border-b border-white/5 mx-2">
                <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
                    <div className="bg-primary p-1 rounded-full"><ThumbsUp size={10} className="text-white fill-white" /></div>
                    <span>{post.likes}</span>
                </div>
                <div className="flex gap-3">
                    <span className="hover:underline cursor-pointer">{post.comments} comentários</span>
                    <span className="hover:underline cursor-pointer">1 compartilhamento</span>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="px-2 py-1">
                <div className="grid grid-cols-3 gap-1">
                    <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors group">
                        <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Curtir</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors group">
                        <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Comentar</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors group">
                        <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Compartilhar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
