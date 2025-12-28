"use client";

import { motion } from "framer-motion";
import { Copy, ExternalLink, Folder } from "lucide-react";
import { useState } from "react";
import { VaultCategory } from "@/lib/data/courses";

interface CourseVaultProps {
    categories: VaultCategory[];
}

export function CourseVault({ categories }: CourseVaultProps) {
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-0 py-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex items-center gap-3">
                <Folder className="text-cyan-400" /> The Vault
                <span className="text-sm font-medium text-gray-500 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full">Recursos Exclusivos</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">{category.title}</h3>

                        <div className="space-y-4">
                            {category.items.map((item, itemIndex) => {
                                const uniqueId = `${catIndex}-${itemIndex}`;

                                return (
                                    <div key={itemIndex} className="group bg-black/40 p-4 rounded-xl border border-white/5 hover:bg-zinc-800 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-gray-200">{item.label}</span>
                                            <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{item.type}</span>
                                        </div>

                                        {item.type === "copy" && (
                                            <div className="flex gap-2 mt-2">
                                                <div className="flex-1 bg-black/50 p-2 rounded text-xs text-gray-400 font-mono truncate border border-white/5">
                                                    {item.value}
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(item.value, uniqueId)}
                                                    className="p-2 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded transition-colors"
                                                >
                                                    {copiedIndex === uniqueId ? "Copiado!" : <Copy size={16} />}
                                                </button>
                                            </div>
                                        )}

                                        {item.type === "link" && (
                                            <a
                                                href={item.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 mt-2 text-sm text-cyan-400 hover:underline"
                                            >
                                                Acessar Recurso <ExternalLink size={14} />
                                            </a>
                                        )}

                                        {item.type === "command" && (
                                            <div className="bg-black p-3 rounded-lg border border-white/10 mt-2 font-mono text-sm text-green-400">
                                                $ {item.value}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
