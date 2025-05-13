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
    },
];

export default function PartnerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { auth } = usePage().props;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="bg-slate-100 w-64 h-screen shadow-md px-2 fixed ">
                <div className="flex px-4 my-8 space-y-2 gap-4">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                    <div>
                        <p className="font-semibold">{auth.user.name}</p>
                        <p className="font-thin">{auth.user.email}</p>
                    </div>
                </div>
                <hr />
                <nav className="mt-4">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.path}>
                            <div className="flex gap-4 my-4 mx-4">
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
