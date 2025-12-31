"use client";

import { Video, Image as ImageIcon, Smile, Send } from "lucide-react";
import { useState } from "react";

export function CreatePost() {
    const [content, setContent] = useState("");

    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl mb-6 overflow-hidden">
            {/* Top Section: Input */}
            <div className="p-4 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 cursor-pointer" />
                <div className="flex-1 bg-zinc-800/50 rounded-full px-4 py-2.5 flex items-center hover:bg-zinc-800 transition-colors cursor-text group">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="No que você está pensando, Aioficina?"
                        className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full ml-1"
                    />
                </div>
            </div>

            <div className="h-[1px] bg-white/5 mx-4" />

            {/* Bottom Section: Actions */}
            <div className="p-2 grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-zinc-800 transition-colors group">
                    <Video className="text-red-500" size={20} />
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">Vídeo ao vivo</span>
                </button>

                <button className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-zinc-800 transition-colors group">
                    <ImageIcon className="text-green-500" size={20} />
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">Foto/vídeo</span>
                </button>

                <button className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-zinc-800 transition-colors group">
                    <Smile className="text-yellow-500" size={20} />
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">Sentimento/atividade</span>
                </button>
            </div>

            {/* Hidden Submit Button (only shows when typing) or we can make it a specific enter flow. 
                For now, keeping it simple as per UX. If content exists, we could show a different UI or just let enter submit.
                Since the request was UX visual improvement, the input looking like a "trigger" is key.
                However, to make it functional like before, I'll add a small submit if there is content.
            */}
            {content.trim() && (
                <div className="px-4 pb-3 flex justify-end animate-in fade-in slide-in-from-top-1">
                    <button
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-all text-sm"
                    >
                        <Send size={14} /> Publicar
                    </button>
                </div>
            )}
        </div>
    );
}
