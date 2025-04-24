import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link, usePage } from "@inertiajs/react";
import { Search, Home, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CustomerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { auth } = usePage().props;

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    // Close mobile nav when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            const menuButton = document.getElementById("mobile-menu-button");

            if (
                isNavOpen &&
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                menuButton &&
                !menuButton.contains(event.target as Node)
            ) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isNavOpen]);

    // Close mobile nav when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsNavOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Navigation items - simplified to just Beranda and Profile
    const navItems = [
        { name: "Beranda", icon: Home, href: "/" },
        { name: "Profile", icon: User, href: "/profile" },
    ];

    return (
        <div className="flex h-screen max-h-screen overflow-hidden bg-slate-50">
            {/* Mobile Nav Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
                    isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsNavOpen(false)}
            />

            {/* Mobile Menu Button */}
            <div
                className="md:hidden fixed top-4 left-4 z-50"
                id="mobile-menu-button"
            >
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleNav}
                    className="bg-indigo-700 text-white border-indigo-600 hover:bg-indigo-800 shadow-md"
                >
                    {isNavOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Left Sidebar */}
            <div
                id="sidebar"
                className={`${
                    isNavOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ${
                    isCollapsed ? "w-16" : "w-56"
                } bg-indigo-800 h-full fixed md:relative left-0 top-0 flex flex-col shadow-lg text-white z-40`}
                style={{ overflowX: "hidden" }}
            >
                {/* Logo */}
                <div className="p-4 border-b border-indigo-700 flex items-center justify-center">
                    <Link
                        href="/"
                        className={`flex ${
                            isCollapsed
                                ? "justify-center"
                                : "flex-col items-center"
                        }`}
                    >
                        {isCollapsed ? (
                            <p className="font-extrabold text-xl">G</p>
                        ) : (
                            <>
                                <p className="font-extrabold text-xl tracking-wider">
                                    GOTIX
                                </p>
                                <p className="font-light text-xs text-indigo-200">
                                    Get Your Online Ticket
                                </p>
                            </>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 pt-4">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center ${
                                        isCollapsed
                                            ? "justify-center"
                                            : "justify-start"
                                    } gap-3 px-3 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors group`}
                                >
                                    <item.icon
                                        size={18}
                                        className="text-indigo-300 group-hover:text-white transition-colors min-w-5"
                                    />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div className="mt-auto">
                    {/* Collapse Button */}
                    <div className="px-2 py-3 border-t border-indigo-700 hidden md:block">
                        <button
                            onClick={toggleSidebar}
                            className={`flex items-center ${
                                isCollapsed
                                    ? "justify-center w-full"
                                    : "justify-between w-full"
                            } text-indigo-300 hover:text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm`}
                        >
                            {!isCollapsed && <span>Ciutkan</span>}
                            <Menu
                                size={18}
                                className={isCollapsed ? "" : "rotate-90"}
                            />
                        </button>
                    </div>

                    {/* Auth Section */}
                    <div
                        className={`p-4 border-t border-indigo-700 ${
                            isCollapsed ? "flex flex-col items-center" : ""
                        }`}
                    >
                        {!isCollapsed ? (
                            <>
                                {!auth.user ? (
                                    <div>
                                        <Link href="/login" className="w-full">
                                            <Button
                                                variant="outline"
                                                className="w-full bg-transparent border-indigo-400 text-white hover:bg-indigo-700 mb-2"
                                                size="sm"
                                            >
                                                Masuk
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="w-full"
                                        >
                                            <Button
                                                className="w-full bg-indigo-500 hover:bg-indigo-600"
                                                size="sm"
                                            >
                                                Daftar
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-full flex gap-4 my-4 justify-start items-center">
                                            <img
                                                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {auth.user.name}
                                                </p>
                                                <p className="text-xs font-light">
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Link href="/logout" className="w-full">
                                            <Button className="w-full bg-transparent hover:bg-red-400 border border-white">
                                                Logout
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href={auth.user ? "/profile" : "/login"}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8 bg-transparent border-indigo-400 text-white hover:bg-indigo-700"
                                >
                                    <User size={16} />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
                {/* Top Navigation Bar */}
                <div className="bg-white shadow py-3 px-4 flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="hidden md:block flex-1 max-w-md">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <Input
                                type="search"
                                placeholder="Cari event atau konser..."
                                className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Mobile Title */}
                    <div className="md:hidden mx-auto">
                        <p className="font-bold text-lg text-indigo-700">
                            GOTIX
                        </p>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        {!auth.user ? (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg px-4 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                    >
                                        Masuk
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        size="sm"
                                        className="rounded-lg px-4 bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Daftar
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href="/profile">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent border-indigo-400 text-indigo-700 hover:bg-indigo-50"
                                >
                                    <User size={18} />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="p-4 md:hidden">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            type="search"
                            placeholder="Cari event atau konser..."
                            className="pl-10 bg-gray-50 border-gray-200 rounded-lg w-full"
                        />
                    </div>
                </div>

                {/* Page Content */}
                <div
                    className="flex-1 overflow-y-auto p-4 md:p-6 w-full"
                    style={{ overflowX: "hidden" }}
                >
                    {children}
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-4 px-6 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} GOTIX. All rights
                                reserved.
                            </p>
                        </div>
                        <div className="flex space-x-4 text-sm">
                            <Link
                                href="/help"
                                className="text-gray-500 hover:text-indigo-600"
                            >
                                Bantuan
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
