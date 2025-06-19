import StatCard from "@/components/StatCard";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
import { Banknote, CircleDollarSign, LogOut, Ticket } from "lucide-react";

type ReportProps = {
    ticket_solds: number;
    total_revenue: number;
    unreleased_earnings: number;
};

export default function Report({
    ticket_solds,
    total_revenue,
    unreleased_earnings,
}: ReportProps) {
    return (
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Laporan</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<Ticket />}
                        title="Tiket Terjual"
                        value={ticket_solds.toString()}
                    />
                    <StatCard
                        icon={<CircleDollarSign />}
                        title="Pendapatan Total"
                        value={`Rp ${total_revenue}`}
                    />
                    <StatCard
                        icon={<CircleDollarSign />}
                        title="Pendapatan Belum Dicairkan"
                        value={`Rp ${unreleased_earnings}`}
                    />
                </div>
                <a
                    href="https://forms.gle/x4P6DWbadFXUgvSz6"
                    target="_blank"
                    className="flex items-center justify-center bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600 transition duration-200"
                >
                    Ajukan Pencairan Dana
                </a>
                <a
                    href="https://forms.gle/x4P6DWbadFXUgvSz6"
                    target="_blank"
                    className="flex items-center justify-center bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600 transition duration-200"
                >
                    Detail Pencairan Dana
                </a>
            </PartnerLayout>
        </>
    );
}
