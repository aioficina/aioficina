"use client";

import { Send, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export function CreatePost() {
    const [content, setContent] = useState("");

    return (
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0" />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="No que você está trabalhando hoje?"
                        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none h-20 text-base"
                    />

                    <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                            <ImageIcon size={20} />
                        </button>
                        <button
                            disabled={!content.trim()}
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                        >
                            <Send size={16} /> Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
