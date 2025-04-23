import PartnerLayout from "@/Layouts/PartnerLayout";
import { LogOut, Users, Settings, BarChart3 } from "lucide-react";

export default function Dashboard() {
    return (
        <PartnerLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard icon={<Users />} title="Users" value="1,234" />
                    <StatCard
                        icon={<BarChart3 />}
                        title="Sales"
                        value="$12,340"
                    />
                    <StatCard
                        icon={<Settings />}
                        title="Settings"
                        value="12 Configs"
                    />
                </div>

                {/* Welcome Message */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Selamat Datang, Admin! 🎉
                    </h2>
                    <p className="text-gray-600">
                        Berikut adalah statitsik dari web GOTIX Anda.
                    </p>
                </div>
            </div>
        </PartnerLayout>
    );
}

type StatCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

function StatCard({ icon, title, value }: StatCardProps) {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}
