import StatCard from "@/Components/StatCard";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
import { Banknote, LogOut, Ticket } from "lucide-react";

export default function Report() {
    return (
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Laporan</p>
                <div>
                    <StatCard
                        icon={<Ticket />}
                        title="Tiket Terjual"
                        value={ticket_solds.toString()}
                    />
                    <StatCard
                        icon={<CircleDollarSign />}
                        title="Pendapatan Total"
                        value={`Rp ${earnings.toString()}`}
                    />
                </div>
            </PartnerLayout>
        </>
    );
}
