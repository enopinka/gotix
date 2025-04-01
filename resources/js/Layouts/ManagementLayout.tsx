import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

interface MenuItem {
    name: string;
    icon: ReactNode;
    path: string;
}

interface ManagementLayoutProps {
    children: ReactNode;
    menu: MenuItem[];
}

export default function ManagementLayout({
    children,
    menu,
}: ManagementLayoutProps) {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-slate-100 w-64 h-screen shadow-md px-2">
                <div className="flex flex-col justify-center items-center my-16 space-y-2">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                    <p>Admin 1</p>
                    <p>admin1@gmail.com</p>
                </div>
                <hr />
                <nav className="mt-4">
                    {menu.map((item, index) => (
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

            <div className="flex-1 p-4">{children}</div>
        </div>
    );
}
