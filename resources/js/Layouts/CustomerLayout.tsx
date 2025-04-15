import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link } from "@inertiajs/react";
import {
    Search,
    Ticket,
    Menu,
    X,
    User,
    Bell,
    ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CustomerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMenuOpen && !target.closest(".mobile-menu-container")) {
                setIsMenuOpen(false);
            }
            if (isSearchOpen && !target.closest(".search-container")) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen, isSearchOpen]);

    // Simulate search functionality
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearching(true);
            // Simulate search delay
            setTimeout(() => {
                setIsSearching(false);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Desktop Navbar */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white text-indigo-700 shadow-md"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="py-4 px-4 md:px-8 flex items-center justify-between">
                        {/* Logo Section */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:opacity-90 transition group"
                        >
                            <div
                                className={`p-2 rounded-full ${
                                    isScrolled ? "bg-indigo-100" : "bg-white/10"
                                } transition-all duration-300 group-hover:rotate-12`}
                            >
                                <Ticket
                                    className={`h-6 w-6 ${
                                        isScrolled
                                            ? "text-indigo-600"
                                            : "text-white"
                                    } transition-colors duration-300`}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-extrabold text-2xl tracking-wider transition-all duration-300">
                                    GOTIX
                                </p>
                                <p
                                    className={`font-light text-xs -mt-1 ${
                                        isScrolled
                                            ? "text-indigo-500"
                                            : "text-white/80"
                                    } transition-colors duration-300`}
                                >
                                    Get Your Online Ticket
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Search and Nav */}
                        <div className="hidden md:flex items-center gap-4">
                            <form
                                onSubmit={handleSearch}
                                className="search-container relative"
                            >
                                <Input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className={`w-64 pl-10 rounded-full transition-all duration-300 border-0 focus:ring-2 ${
                                        isScrolled
                                            ? "bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:ring-indigo-300"
                                            : "bg-white/10 text-white placeholder:text-white/70 focus:bg-white/20 focus:ring-white/50"
                                    }`}
                                />
                                <button
                                    type="submit"
                                    className="absolute left-3 top-2.5"
                                >
                                    {isSearching ? (
                                        <div
                                            className={`h-4 w-4 rounded-full border-2 border-t-transparent animate-spin ${
                                                isScrolled
                                                    ? "border-indigo-500"
                                                    : "border-white"
                                            }`}
                                        ></div>
                                    ) : (
                                        <Search
                                            className={`h-4 w-4 ${
                                                isScrolled
                                                    ? "text-gray-500"
                                                    : "text-white/70"
                                            }`}
                                        />
                                    )}
                                </button>
                            </form>

                            <nav className="flex gap-2 ml-4">
                                {["Events", "About", "Contact"].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase()}`}
                                    >
                                        <Button
                                            variant="ghost"
                                            className={`relative overflow-hidden ${
                                                isScrolled
                                                    ? "hover:bg-indigo-50 text-indigo-700"
                                                    : "hover:bg-white/10 text-white"
                                            }`}
                                        >
                                            <span className="relative z-10">
                                                {item}
                                            </span>
                                            <span
                                                className={`absolute inset-0 bg-gradient-to-r ${
                                                    isScrolled
                                                        ? "from-indigo-100 to-blue-100"
                                                        : "from-white/10 to-white/5"
                                                } scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
                                            ></span>
                                        </Button>
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex items-center gap-2 ml-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full relative ${
                                        isScrolled
                                            ? "hover:bg-indigo-50"
                                            : "hover:bg-white/10"
                                    }`}
                                >
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full relative ${
                                        isScrolled
                                            ? "hover:bg-indigo-50"
                                            : "hover:bg-white/10"
                                    }`}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                                        2
                                    </span>
                                </Button>

                                <Link href="/login">
                                    <Button
                                        className={`transition-all duration-300 ${
                                            isScrolled
                                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                : "bg-white text-indigo-700 hover:bg-white/90"
                                        }`}
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`hover:bg-opacity-10 ${
                                    isScrolled
                                        ? "hover:bg-indigo-100"
                                        : "hover:bg-white/10"
                                }`}
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`hover:bg-opacity-10 ${
                                    isScrolled
                                        ? "hover:bg-indigo-100"
                                        : "hover:bg-white/10"
                                }`}
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {isSearchOpen && (
                        <div className="p-4 md:hidden border-t border-white/10 search-container">
                            <form onSubmit={handleSearch} className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className={`w-full pl-10 rounded-full transition-all duration-300 border-0 ${
                                        isScrolled
                                            ? "bg-gray-100 text-gray-800 placeholder:text-gray-500"
                                            : "bg-white/10 text-white placeholder:text-white/70 focus:bg-white/20"
                                    }`}
                                />
                                <button
                                    type="submit"
                                    className="absolute left-3 top-2.5"
                                >
                                    {isSearching ? (
                                        <div
                                            className={`h-4 w-4 rounded-full border-2 border-t-transparent animate-spin ${
                                                isScrolled
                                                    ? "border-indigo-500"
                                                    : "border-white"
                                            }`}
                                        ></div>
                                    ) : (
                                        <Search
                                            className={`h-4 w-4 ${
                                                isScrolled
                                                    ? "text-gray-500"
                                                    : "text-white/70"
                                            }`}
                                        />
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <div
                        className={`mobile-menu-container md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                            isMenuOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                        } ${
                            isScrolled
                                ? "bg-white border-t border-gray-100"
                                : "bg-indigo-800 border-t border-white/10"
                        }`}
                    >
                        <nav className="p-4 flex flex-col gap-2">
                            {["Events", "About", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                >
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start ${
                                            isScrolled
                                                ? "hover:bg-indigo-50 text-indigo-700"
                                                : "hover:bg-white/10 text-white"
                                        } group`}
                                    >
                                        <span className="relative">
                                            {item}
                                            <span
                                                className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                                                    isScrolled
                                                        ? "bg-indigo-500"
                                                        : "bg-white"
                                                }`}
                                            ></span>
                                        </span>
                                    </Button>
                                </Link>
                            ))}

                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                    variant="ghost"
                                    className={`flex-1 relative ${
                                        isScrolled
                                            ? "hover:bg-indigo-50 text-indigo-700"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    <Bell className="h-5 w-5 mr-2" />
                                    Notifications
                                    <span className="absolute top-3 left-3 h-2 w-2 bg-red-500 rounded-full"></span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    className={`flex-1 relative ${
                                        isScrolled
                                            ? "hover:bg-indigo-50 text-indigo-700"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Cart
                                    <span className="ml-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                        2
                                    </span>
                                </Button>
                            </div>

                            <Link href="/login">
                                <Button
                                    className={`w-full mt-2 ${
                                        isScrolled
                                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                            : "bg-white text-indigo-700 hover:bg-white/90"
                                    }`}
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Login
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    {children}
                </div>
            </main>

            {/* Footer - Added to complete the layout */}
            <footer
                className={`py-6 ${
                    isScrolled
                        ? "bg-gray-100 text-gray-800"
                        : "bg-indigo-900 text-white/90"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Ticket
                                className={`h-5 w-5 ${
                                    isScrolled
                                        ? "text-indigo-600"
                                        : "text-white/90"
                                }`}
                            />
                            <span className="font-bold text-lg">GOTIX</span>
                        </div>
                        <div className="text-sm">
                            © {new Date().getFullYear()} GOTIX. All rights
                            reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
