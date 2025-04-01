import ManagementLayout from "@/Layouts/ManagementLayout";
import { Link } from "@inertiajs/react";
import { Banknote, LogOut, Ticket } from "lucide-react";

export default function Dashboard() {
    const menuItems = [
        {
            name: "Acara",
            icon: <Ticket />,
            path: "/logout",
        },
        {
            name: "Laporan",
            icon: <Banknote />,
            path: "/logout",
        },
        {
            name: "Logout",
            icon: <LogOut />,
            path: "/logout",
        },
    ];

    return (
        <>
            <ManagementLayout menu={menuItems}>
                <p>Ini halaman mitra</p>
            </ManagementLayout>
        </>
    );
}
