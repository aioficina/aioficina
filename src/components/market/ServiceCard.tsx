"use client";

import { Service } from "@/lib/data/market";
import { BadgeCheck, Star } from "lucide-react";

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 transition-all cursor-pointer">
            {/* Thumbnail */}
            <div className="h-40 overflow-hidden relative">
                <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-500 flex items-center gap-1">
                    <Star size={10} className="fill-yellow-500" /> {service.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <img src={service.server_avatar} className="w-6 h-6 rounded-full" alt={service.server_name} />
                    <span className="text-xs text-gray-400 font-medium">{service.server_name}</span>
                    {service.server_badges.includes("Vibe Coder") && (
                        <BadgeCheck size={14} className="text-cyan-400" />
                    )}
                </div>

                <h3 className="font-bold text-white text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {service.title}
                </h3>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8">
                    {service.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {service.category}
                    </span>
                    <span className="font-bold text-white text-sm">
                        {service.price_range}
                    </span>
                </div>
            </div>
        </div>
    );
}
