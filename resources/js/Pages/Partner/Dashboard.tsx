import PartnerLayout from "@/Layouts/PartnerLayout";
import { usePage } from "@inertiajs/react";
import { CalendarRangeIcon, Ticket, CircleDollarSign, Sparkles } from "lucide-react";
import React, { useMemo } from "react";

const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle?: string;
    color: "blue" | "cyan" | "green";
}) => {
    const colorClasses = {
        blue: "from-blue-400 to-cyan-400",
        cyan: "from-cyan-400 to-blue-400",
        green: "from-emerald-400 to-teal-400",
    };
    const iconBg = {
        blue: "bg-gradient-to-br from-blue-500 to-cyan-400",
        cyan: "bg-gradient-to-br from-cyan-500 to-blue-400",
        green: "bg-gradient-to-br from-emerald-500 to-teal-400",
    };
    return (
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-200 border border-blue-100">
                <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${iconBg[color]}`}>
                    <span className="text-white text-3xl">{icon}</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-1">{value}</div>
                <div className={`text-base font-medium text-gray-500`}>{title}</div>
            </div>
        );
    };


type DashboardProps = {
    events: number;
    ticket_solds: number;
    earnings: number;
};

export default function Dashboard({
    events,
    ticket_solds,
    earnings,
}: DashboardProps) {
    const { auth } = usePage().props;

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
            <div className="space-y-8 p-6 bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            Dashboard Mitra
                        </h1>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            Ringkasan performa event Anda di GOTIX
                        </p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold mb-1 text-gray-800">
                            Selamat Datang, <span className="text-blue-600">{auth.user.name}</span>! 🎉
                        </h2>
                        <p className="text-gray-600">
                            Berikut adalah statistik dari web <span className="font-semibold text-blue-500">GOTIX</span> Anda.
                        </p>
                    </div>
                    
                </div>

                {/* Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<CalendarRangeIcon className="w-8 h-8" />}
                        title="Total Acara"
                        value={events ? events.toString() : "0"}
                        color="blue"
                    />
                    <StatCard
                        icon={<Ticket className="w-8 h-8" />}
                        title="Tiket Terjual"
                        value={ticket_solds ? ticket_solds.toString() : "0"}
                        color="cyan"
                    />
                    <StatCard
                        icon={<CircleDollarSign className="w-8 h-8" />}
                        title="Pendapatan Total"
                        value={earnings ? formatCurrency(earnings) : "Rp 0"}
                        color="green"
                    />
                </div>
            </div>
        </PartnerLayout>
    );
}