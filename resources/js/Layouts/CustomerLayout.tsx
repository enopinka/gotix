import { Button } from "@/components/ui/button";
import { Link, usePage, router } from "@inertiajs/react";
import { Search, Home, User, Menu, LogOut, Ticket, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AVATAR_FALLBACK =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png";

const ANIMATIONS = {
    header: {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 120, damping: 25 },
    },
    slideDown: {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.3, ease: "easeInOut" },
    },
    fadeIn: {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2 },
    },
    scaleIn: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: { duration: 0.2 },
    },
};

interface SearchResult {
    id: number;
    title: string;
    date: string;
    place: string;
    poster?: string;
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const useScrollDetection = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isScrolled;
};

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as any;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const isScrolled = useScrollDetection();
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const searchRef = useRef<HTMLDivElement>(null);

    const performSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `/api/search-events?query=${encodeURIComponent(query)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
                setShowSearchResults(true);
            }
        } catch (error) {
            console.error("Pencarian gagal:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSearchResults(false);
                setSearchFocused(false);
            }
        };

        const handleResize = () =>
            window.innerWidth >= 768 && setIsMenuOpen(false);

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery) {
            performSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, performSearch]);

    const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get("/", { search: searchQuery.trim() });
            setShowSearchResults(false);
            setSearchFocused(false);
        }
    };

    const handleResultClick = (eventId: number) => {
        router.get(`/event/${eventId}`);
        setShowSearchResults(false);
        setSearchFocused(false);
        setSearchQuery("");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getAvatarUrl = () => {
        if (!auth.user?.photo) return AVATAR_FALLBACK;
        return auth.user.photo.startsWith("http")
            ? auth.user.photo
            : `/storage/${auth.user.photo.replace("/storage/", "")}`;
    };

    const Logo = () => (
        <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="font-bold text-2xl">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        GOTIX
                    </span>
                </span>
            </motion.div>
        </Link>
    );

    const SearchResults = () => (
        <AnimatePresence>
            {showSearchResults && (searchResults.length > 0 || isSearching) && (
                <motion.div
                    className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 mt-3 z-50 max-h-80 overflow-y-auto"
                    {...ANIMATIONS.scaleIn}
                >
                    {isSearching ? (
                        <div className="px-4 py-6 text-center">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                                Mencari event...
                            </p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="py-2">
                            {searchResults.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:scale-[1.02]"
                                    onClick={() => handleResultClick(event.id)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="flex items-center space-x-3">
                                        {event.poster && (
                                            <img
                                                src={event.poster}
                                                alt={event.title}
                                                className="w-12 h-12 object-cover rounded-xl shadow-md border border-gray-200"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-gray-900 truncate">
                                                {event.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(event.date)} •{" "}
                                                {event.place}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                            <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm">
                                Tidak ada event yang ditemukan
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );

    const SearchBar = () => (
        <div
            className="relative w-full max-w-2xl mx-8 hidden md:block"
            ref={searchRef}
        >
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <motion.input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari event impian Anda..."
                    className={cn(
                        "w-full pl-12 pr-6 py-3.5 bg-gray-700/80 backdrop-blur-xl border border-gray-600 text-white placeholder:text-gray-400",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-700",
                        "transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20",
                        "text-sm font-medium"
                    )}
                    onFocus={() => {
                        setSearchFocused(true);
                        if (searchQuery.trim()) {
                            setShowSearchResults(true);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearchSubmit(e);
                        }
                    }}
                    animate={{ scale: searchFocused ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                />
                {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-blue-400/50 border-t-blue-400 rounded-full animate-spin" />
                    </div>
                )}
            </div>
            <SearchResults />
        </div>
    );

    const UserMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 group backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img
                        src={getAvatarUrl()}
                        className="w-9 h-9 rounded-xl object-cover border-2 border-gray-600 shadow-lg group-hover:border-blue-500/50 transition-all duration-200"
                        alt="Profile"
                        onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
                    />
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-semibold text-white max-w-32 truncate">
                            {auth.user.name}
                        </p>
                        <p className="text-xs text-gray-400">Member Premium</p>
                    </div>
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 mt-2 bg-gray-800/95 backdrop-blur-xl border-gray-700 shadow-2xl rounded-2xl"
                align="end"
                sideOffset={8}
            >
                <div className="px-4 py-3 border-b border-gray-700 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-t-2xl">
                    <p className="font-semibold text-white">{auth.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                        {auth.user.email}
                    </p>
                </div>
                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-300 hover:text-white rounded-none"
                    >
                        <User className="w-4 h-4 text-gray-400" />
                        <span>Profil Saya</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href="/tickets"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-300 hover:text-white rounded-none"
                    >
                        <Ticket className="w-4 h-4 text-gray-400" />
                        <span>Tiket Saya</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem asChild>
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/50 hover:text-red-300 rounded-b-2xl"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const AuthButtons = () => (
        <div className="flex items-center space-x-3">
            <Link href="/register" className="hidden md:block">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600 rounded-xl px-6 font-medium backdrop-blur-sm transition-all duration-200"
                    >
                        Daftar
                    </Button>
                </motion.div>
            </Link>
            <Link href="/login">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 font-semibold shadow-lg rounded-xl hover:shadow-blue-500/25 transition-all duration-200"
                    >
                        Masuk
                    </Button>
                </motion.div>
            </Link>
        </div>
    );

    const MobileMenuToggle = () => (
        <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2.5 h-10 w-10 hover:bg-gray-700 rounded-xl transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {isMenuOpen ? (
                        <X className="w-5 h-5 text-white" />
                    ) : (
                        <Menu className="w-5 h-5 text-white" />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    );

    const MobileMenu = () => (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-700"
                    {...ANIMATIONS.slideDown}
                >
                    <nav className="py-4">
                        <div className="px-4 pb-4 border-b border-gray-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Cari event..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 px-2 pt-2">
                            {[
                                { href: "/", icon: Home, label: "Beranda" },
                                ...(auth.user
                                    ? [
                                          {
                                              href: "/tickets",
                                              icon: Ticket,
                                              label: "Tiket Saya",
                                          },
                                      ]
                                    : []),
                            ].map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-all duration-200 rounded-xl mx-2 text-gray-300 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}

                            {!auth.user && (
                                <div className="border-t border-gray-700 mt-4 pt-4 mx-2">
                                    <Link
                                        href="/register"
                                        className="block px-4 py-3 text-gray-300 font-medium hover:bg-gray-700 transition-all duration-200 rounded-xl hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const Footer = () => (
        <footer className="bg-gray-900 border-t border-gray-800 text-white mt-16">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-xl">
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    GOTIX
                                </span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-md">
                            Platform terdepan untuk event terbaik di Indonesia
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm">
                        <div className="flex items-center gap-4 text-gray-400">
                            <span>gotixppl@gmail.com</span>
                            <span className="hidden md:inline">•</span>
                            <span>+62 851-5626-6495</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} GOTIX. Seluruh hak
                            cipta dilindungi.
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <Link
                                href="/privacy"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Kebijakan Privasi
                            </Link>
                            <span>•</span>
                            <Link
                                href="/terms"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Syarat & Ketentuan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <motion.header
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-500 ease-out",
                    isScrolled
                        ? "bg-gray-900/90 backdrop-blur-2xl shadow-lg border-b border-gray-800"
                        : "bg-gray-900 shadow-md"
                )}
                {...ANIMATIONS.header}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-18 py-2">
                        <Logo />
                        <SearchBar />
                        <div className="flex items-center space-x-4">
                            {auth.user ? <UserMenu /> : <AuthButtons />}
                            <MobileMenuToggle />
                        </div>
                    </div>
                </div>
                <MobileMenu />
            </motion.header>

            <main className="flex-1 pt-20">
                <div className="container mx-auto px-4 py-6">{children}</div>
            </main>

            <Footer />
        </div>
    );
}
