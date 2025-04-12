import { Link } from "@inertiajs/react";
import { Ticket, Banknote, LogOut } from "lucide-react";
import { ReactNode } from "react";

const menuItems = [
    {
        name: "Acara",
        icon: <Ticket />,
        path: "#",
    },
    {
        name: "Laporan",
        icon: <Banknote />,
        path: "#",
    },
    {
        name: "Logout",
        icon: <LogOut />,
        path: "/logout",
    },
];

export default function PartnerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="bg-slate-100 w-64 h-screen shadow-md px-2 fixed">
                <div className="flex flex-col justify-center items-center my-16 space-y-2">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                    <p>Admin 1</p>
                    <p>admin1@gmail.com</p>
                </div>
                <hr />
                <nav className="mt-4">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.path}>
                            <div className="flex gap-4 my-4">
                                <div>{item.icon}</div>
                                <p>{item.name}</p>
                            </div>
                            <hr />
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 ml-64 h-screen overflow-y-auto p-4">
                {children}
            </div>
        </div>
    );
}
