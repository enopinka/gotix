import { Link, usePage } from "@inertiajs/react";
import {
    LogOut,
    UsersIcon,
    HandshakeIcon,
    LayoutDashboardIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
    {
        name: "Dashboard",
        icon: <LayoutDashboardIcon />,
        path: "/admin/dashboard",
    },
    {
        name: "Customer",
        icon: <UsersIcon />,
        path: "/admin/customer",
    },
    {
        name: "Promotor",
        icon: <HandshakeIcon />,
        path: "/admin/promotor",
    },
    {
        name: "Logout",
        icon: <LogOut />,
        path: "/logout",
        isLogout: true,
    },
];

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { auth, url } = usePage().props;
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const isActive = (path: string) => {
        return url === path;
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="bg-gray-800 w-72 h-screen shadow-xl border-r border-gray-700 fixed z-50">
                    {/* Admin Profile Section */}
                    <div className="flex flex-col justify-center items-center py-6 px-4 border-b border-gray-700">
                        <div className="relative mb-3">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-white font-semibold text-base mb-1">
                                {auth.user.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                                {auth.user.email}
                            </p>
                            <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                ADMIN
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                <Link href={item.path}>
                                    <div
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                                            isActive(item.path)
                                                ? "bg-blue-600 text-white"
                                                : item.isLogout
                                                ? "hover:bg-red-600 text-gray-300 hover:text-white"
                                                : "hover:bg-gray-700 text-gray-300 hover:text-white"
                                        }`}
                                        onMouseEnter={() =>
                                            setHoveredItem(item.name)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredItem(null)
                                        }
                                    >
                                        <div
                                            className={`${
                                                isActive(item.path)
                                                    ? "text-white"
                                                    : item.isLogout
                                                    ? "text-red-400"
                                                    : "text-gray-400"
                                            } group-hover:text-white transition-colors duration-200`}
                                        >
                                            {item.icon}
                                        </div>
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 ml-72 h-screen overflow-y-auto">
                    <div className="p-6">
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
