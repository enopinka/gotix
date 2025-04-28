import { Button } from "@/Components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import {
    Search,
    Home,
    User,
    Menu,
    LogOut,
    ChevronDown,
    Ticket,
    ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Deteksi scroll untuk animasi header

    // Deteksi scroll untuk mengubah tampilan header
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinkClass = `flex items-center gap-2 font-medium transition-colors ${
        isScrolled
            ? "text-gray-700 hover:text-indigo-600"
            : "text-white/90 hover:text-white"
    }`;

    // Menangani path foto profil
    const getProfileImageUrl = () => {
        if (!auth.user || !auth.user.photo) {
            return "https://via.placeholder.com/40";
        }

        if (auth.user.photo.startsWith("http")) {
            return auth.user.photo;
        } else {
            return auth.user.photo.includes("/storage/")
                ? auth.user.photo
                : `/storage/${auth.user.photo}`;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5"
                        : "bg-gradient-to-r from-indigo-800 to-violet-800 py-3.5"
                }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <h1
                            className={`font-extrabold text-2xl tracking-tight ${
                                isScrolled ? "text-indigo-600" : "text-white"
                            }`}
                        >
                            GO<span className="text-amber-400">TIX</span>
                        </h1>
                    </Link>

                    {/* Menu navigasi utama - Tiket Saya dipindahkan ke dropdown */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={navLinkClass}>
                            <Home size={16} />
                            <span>Beranda</span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <div
                            className={`hidden md:flex items-center rounded-full px-3.5 py-2 transition-colors ${
                                isScrolled
                                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    : "bg-indigo-700/40 text-white hover:bg-indigo-700/60"
                            }`}
                        >
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Cari event..."
                                className={`ml-2 bg-transparent outline-none text-sm w-32 lg:w-44 ${
                                    isScrolled
                                        ? "placeholder:text-gray-400"
                                        : "placeholder:text-indigo-200"
                                }`}
                            />
                        </div>

                        <button
                            className={`md:hidden p-2 rounded-full transition ${
                                isScrolled
                                    ? "bg-gray-100 text-gray-600"
                                    : "bg-indigo-700/40 text-white"
                            }`}
                        >
                            <Search size={18} />
                        </button>

                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 group">
                                    <div className="relative">
                                        <img
                                            src={getProfileImageUrl()}
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-offset-1 ring-indigo-500/40 group-hover:ring-indigo-500/80 transition-all"
                                            alt="Profile"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://via.placeholder.com/40";
                                            }}
                                        />
                                        <span
                                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
                                                isScrolled
                                                    ? "border-white"
                                                    : "border-indigo-700"
                                            } bg-green-500`}
                                        ></span>
                                    </div>
                                    <ChevronDown
                                        size={14}
                                        className={`hidden md:block transition-transform group-hover:rotate-180 ${
                                            isScrolled
                                                ? "text-gray-600"
                                                : "text-white"
                                        }`}
                                    />
                                </button>

                                {/* Dropdown profil dengan Tiket Saya */}
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm font-bold text-gray-800">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {auth.user.email}
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <User
                                                size={16}
                                                className="text-indigo-500"
                                            />
                                            <span>Profil Saya</span>
                                        </div>
                                        <ChevronRight
                                            size={14}
                                            className="text-gray-400"
                                        />
                                    </Link>

                                    {/* Item menu Tiket Saya dengan badge */}
                                    <Link
                                        href="/tickets"
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Ticket
                                                size={16}
                                                className="text-indigo-500"
                                            />
                                            <span>Tiket Saya</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs font-medium">
                                                3
                                            </span>
                                            <ChevronRight
                                                size={14}
                                                className="text-gray-400 ml-1"
                                            />
                                        </div>
                                    </Link>

                                    <div className="border-t my-1"></div>
                                    <Link
                                        href="/logout"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/register"
                                    className="hidden md:block"
                                >
                                    <Button
                                        variant="ghost"
                                        className={`font-medium text-sm rounded-full px-4 ${
                                            isScrolled
                                                ? "text-gray-700 hover:text-indigo-600"
                                                : "text-white hover:bg-indigo-700/40"
                                        }`}
                                    >
                                        Daftar
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button
                                        className={`text-sm rounded-full px-5 shadow-sm ${
                                            isScrolled
                                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                : "bg-white text-indigo-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        Masuk
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <button
                            className="md:hidden p-2 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu
                                size={24}
                                className={
                                    isScrolled ? "text-gray-700" : "text-white"
                                }
                            />
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden absolute w-full bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top">
                        <nav className="flex flex-col py-2">
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 text-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home size={18} className="text-indigo-500" />
                                <span>Beranda</span>
                            </Link>
                            {auth.user && (
                                <Link
                                    href="/tickets"
                                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <Ticket
                                            size={18}
                                            className="text-indigo-500"
                                        />
                                        <span>Tiket Saya</span>
                                    </div>
                                    <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs font-medium">
                                        3
                                    </span>
                                </Link>
                            )}
                            {!auth.user && (
                                <div className="border-t mt-2 pt-2">
                                    <Link
                                        href="/register"
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 text-indigo-600 font-semibold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>Daftar</span>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <main className="flex-1 mt-16 pt-8">
                <div className="container mx-auto px-4">{children}</div>
            </main>

            <footer className="py-8 bg-white border-t">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="font-bold text-xl text-indigo-600">
                                GO<span className="text-amber-400">TIX</span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Temukan dan pesan event favorit Anda.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6 md:gap-8 text-sm"></div>
                    </div>
                    <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
                        <p>
                            © {new Date().getFullYear()} GOTIX. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
