import ManagementLayout from "@/Layouts/ManagementLayout";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
import { Banknote, LogOut, Ticket } from "lucide-react";

export default function Report() {
    return (
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Laporan</p>
            </PartnerLayout>
        </>
    );
}
