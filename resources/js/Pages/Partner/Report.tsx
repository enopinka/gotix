import StatCard from "@/Components/StatCard";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Ticket, CircleDollarSign, Banknote, FileText } from "lucide-react";

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
    // Format rupiah
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <PartnerLayout>
            <div className="max-w-5xl mx-auto py-10 space-y-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                    Laporan Keuangan
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<Ticket className="w-8 h-8 text-blue-500" />}
                        title="Tiket Terjual"
                        value={ticket_solds.toString()}
                    />
                    <StatCard
                        icon={<CircleDollarSign className="w-8 h-8 text-green-500" />}
                        title="Pendapatan Total"
                        value={formatCurrency(total_revenue)}
                    />
                    <StatCard
                        icon={<Banknote className="w-8 h-8 text-cyan-500" />}
                        title="Pendapatan Belum Dicairkan"
                        value={formatCurrency(unreleased_earnings)}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <a
                        href="https://forms.gle/x4P6DWbadFXUgvSz6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl py-3 px-6 shadow hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 gap-2"
                    >
                        <Banknote className="w-5 h-5" />
                        Ajukan Pencairan Dana
                    </a>
                    <a
                        href="https://forms.gle/x4P6DWbadFXUgvSz6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl py-3 px-6 shadow hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        Detail Pencairan Dana
                    </a>
                </div>
            </div>
        </PartnerLayout>
    );
}