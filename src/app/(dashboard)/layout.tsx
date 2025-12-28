import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col pl-[80px] transition-all duration-300 relative overflow-y-auto overflow-x-hidden h-full">
                <Navbar />
                <div className="flex-1 p-6 mt-16 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
