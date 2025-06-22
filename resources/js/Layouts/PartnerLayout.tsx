import { Link, usePage } from "@inertiajs/react";
import {
    Ticket,
    Banknote,
    LogOut,
    LayoutDashboardIcon,
    CalendarRangeIcon,
} from "lucide-react";
import { ReactNode } from "react";

const menuItems = [
    {
        name: "Dashboard",
        icon: <LayoutDashboardIcon />,
        path: "/partner/",
    },
    {
        name: "Acara",
        icon: <CalendarRangeIcon />,
        path: "/partner/event",
    },
    {
        name: "Pesanan",
        icon: <Ticket />,
        path: "/partner/order",
    },
    {
        name: "Laporan",
        icon: <Banknote />,
        path: "/partner/report",
    },
    {
        name: "Logout",
        icon: <LogOut />,
        path: "/logout",
        isLogout: true,
    },
];

export default function PartnerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { auth, url } = usePage().props;

    const isActive = (path: string) => url === path;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="bg-white w-64 h-screen shadow-xl border-r border-blue-100 fixed z-40 flex flex-col">
                    {/* Partner Profile Section */}
                    <div className="flex flex-col items-center py-8 px-4 border-b border-blue-100">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-2 shadow">
                            <span className="text-white text-2xl font-bold">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-gray-800 font-semibold text-base mb-1">
                            {auth.user.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                            {auth.user.email}
                        </p>
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                            MITRA
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item, index) => (
                            <Link href={item.path} key={index}>
                                <div
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                                        ${
                                            isActive(item.path)
                                                ? "border-l-4 border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow"
                                                : item.isLogout
                                                ? "hover:bg-red-50 text-gray-500 hover:text-red-600"
                                                : "hover:bg-blue-100 text-gray-700"
                                        }
                                    `}
                                >
                                    <span
                                        className={`${
                                            isActive(item.path)
                                                ? "text-blue-600"
                                                : item.isLogout
                                                ? "text-red-400"
                                                : "text-blue-400"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 h-screen overflow-y-auto">
                    <div className="p-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 min-h-[calc(100vh-64px)]">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}