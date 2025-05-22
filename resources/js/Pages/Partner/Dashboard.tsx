import StatCard from "@/Components/StatCard";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { usePage } from "@inertiajs/react";
import { CalendarRangeIcon, Ticket, CircleDollarSign } from "lucide-react";

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

    return (
        <PartnerLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Mitra Dashboard</h1>
                </div>

                {/* Welcome Message */}
                <div className="bg-purple-200 shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Selamat Datang, {auth.user.name}! 🎉
                    </h2>
                    <p className="text-gray-600">
                        Berikut adalah statitsik dari web GOTIX Anda.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 purple gap-6">
                    <StatCard 
                        icon={<CalendarRangeIcon />}
                        title="Total Acara"
                        value={events ? events.toString() : "0"}
                          
                    />
                    <StatCard
                        icon={<Ticket />}
                        title="Tiket Terjual"
                        value={ticket_solds ? ticket_solds.toString() : "0"}
                    />
                    <StatCard
                        icon={<CircleDollarSign />}
                        title="Pendapatan Total"
                        value={earnings ? `Rp ${earnings.toString()}` : "Rp 0"}
                    />
                </div>
            </div>
        </PartnerLayout>
    );
}
