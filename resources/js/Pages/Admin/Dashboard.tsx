import ManagementLayout from "@/Layouts/ManagementLayout";
import { LogOut } from "lucide-react";

export default function Dashboard() {
    const menuItems = [
        {
            name: "Logout",
            icon: <LogOut />,
            path: "/logout",
        },
    ];

    return (
        <>
            <ManagementLayout menu={menuItems}>
                <p>Ini Halaman Admin</p>
            </ManagementLayout>
        </>
    );
}
