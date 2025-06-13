type StatCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

export default function StatCard({ icon, title, value }: StatCardProps) {
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
