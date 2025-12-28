"use client";

import { CourseHero } from "@/components/course/CourseHero";
import { ModuleList } from "@/components/course/ModuleList";
import { CourseVault } from "@/components/course/CourseVault";
import { useParams } from "next/navigation";
import { COURSES } from "@/lib/data/courses";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CoursePage() {
    const params = useParams();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState<"aulas" | "vault">("aulas");

    // Find course data
    const course = COURSES.find((c) => c.id === id) || COURSES[0];

    return (
        <div className="min-h-screen pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <CourseHero
                title={course.title}
                description={course.description}
                tags={course.tags}
            />

            {/* Tab Navigation (Only if Vault exists) */}
            {course.vault && (
                <div className="container mx-auto px-4 md:px-0 mb-8 -mt-16 relative z-30 flex gap-6 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab("aulas")}
                        className={cn(
                            "pb-4 text-lg font-bold transition-all border-b-2",
                            activeTab === "aulas"
                                ? "text-white border-primary"
                                : "text-gray-500 border-transparent hover:text-gray-300"
                        )}
                    >
                        AULAS
                    </button>
                    <button
                        onClick={() => setActiveTab("vault")}
                        className={cn(
                            "pb-4 text-lg font-bold transition-all border-b-2",
                            activeTab === "vault"
                                ? "text-cyan-400 border-cyan-400"
                                : "text-gray-500 border-transparent hover:text-gray-300"
                        )}
                    >
                        THE VAULT
                    </button>
                </div>
            )}

            {/* Content Area */}
            <div className={cn(!course.vault && "-mt-20 relative z-30")}>
                {activeTab === "aulas" ? (
                    <ModuleList modules={course.modules} courseId={course.id} />
                ) : (
                    course.vault && <CourseVault categories={course.vault} />
                )}
            </div>
        </div>
    );
}
