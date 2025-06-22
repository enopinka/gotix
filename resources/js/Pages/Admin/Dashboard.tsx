import AdminLayout from "@/Layouts/AdminLayout";
import {
    Users,
    Calendar,
    ShoppingCart,
    DollarSign,
    Ticket,
    TrendingUp,
    UserCheck,
    CalendarDays,
    Clock,
    CheckCircle,
    XCircle,
    Activity,
    Sparkles,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { memo, useMemo } from "react";

interface Statistics {
    users: {
        total: number;
        customers: number;
        promotors: number;
        admins: number;
    };
    events: {
        total: number;
        active: number;
        past: number;
    };
    orders: {
        total: number;
        pending: number;
        paid: number; // Updated from 'completed' to 'paid'
        cancelled: number;
    };
    revenue: {
        total: number;
        monthly: number;
    };
    tickets: {
        total: number;
        sold: number;
        available: number;
    };
}

interface RecentOrder {
    id: number;
    user: { name: string };
    event: { title: string };
    ticket: { type: string };
    total_price: number;
    status: string;
    created_at: string;
}

interface RecentEvent {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    poster: string | null;
    seating_chart: string | null;
    user_id: number;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface TopPromotor {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
    total_revenue: number;
}

interface ChartData {
    monthlyOrders: Array<{ month: string; orders: number }>;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
}

interface DashboardProps {
    statistics: Statistics;
    recentActivities: {
        orders: RecentOrder[];
        events: RecentEvent[];
    };
    topPromotors: TopPromotor[];
    chartData: ChartData;
}

// Optimized StatCard component with memo
const StatCard = memo(
    ({
        icon,
        title,
        value,
        subtitle,
        color,
    }: {
        icon: React.ReactNode;
        title: string;
        value: string;
        subtitle: string;
        color: "blue" | "green" | "purple" | "yellow";
    }) => {
        const colorClasses = useMemo(
            () => ({
                blue: "from-blue-500 to-cyan-500",
                green: "from-emerald-500 to-teal-600",
                purple: "from-purple-500 to-pink-600",
                yellow: "from-yellow-500 to-orange-500",
            }),
            []
        );

        return (
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                    <div
                        className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg p-3`}
                    >
                        <div className="text-white">{icon}</div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400 mb-1">
                            {title}
                        </p>
                        <p className="text-2xl font-bold text-white mb-1">
                            {value}
                        </p>
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                </div>
            </div>
        );
    }
);

StatCard.displayName = "StatCard";

// Optimized OrderItem component
const OrderItem = memo(
    ({
        order,
        formatCurrency,
        formatDate,
    }: {
        order: RecentOrder;
        formatCurrency: (amount: number) => string;
        formatDate: (dateString: string) => string;
    }) => (
        <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
            <div className="flex-1">
                <p className="font-medium text-white">{order.user.name}</p>
                <p className="text-sm text-gray-300">
                    {order.event.title} - {order.ticket.type}
                </p>
                <p className="text-xs text-gray-400">
                    {formatDate(order.created_at)}
                </p>
            </div>
            <div className="text-right">
                <p className="font-medium text-white">
                    {formatCurrency(order.total_price)}
                </p>
                <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "settlement"
                            ? "bg-emerald-600 text-white"
                            : order.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                    }`}
                >
                    {order.status === "settlement"
                        ? "Terbayar"
                        : order.status === "pending"
                        ? "Pending"
                        : order.status}
                </span>
            </div>
        </div>
    )
);

OrderItem.displayName = "OrderItem";

// Optimized EventItem component
const EventItem = memo(
    ({
        event,
        formatDate,
        formatTime,
    }: {
        event: RecentEvent;
        formatDate: (dateString: string) => string;
        formatTime: (timeString: string) => string;
    }) => (
        <div className="flex items-start space-x-3 py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
            <div className="bg-purple-600 text-white rounded-lg p-2 mt-1">
                <CalendarDays className="w-4 h-4" />
            </div>
            <div className="flex-1">
                <p className="font-medium text-white">{event.title}</p>
                <p className="text-sm text-gray-300">oleh {event.user.name}</p>
                <p className="text-sm text-gray-400">
                    {event.place} • {formatDate(event.date)} •{" "}
                    {formatTime(event.time)}
                </p>
                <p className="text-xs text-gray-500">
                    Dibuat {formatDate(event.created_at)}
                </p>
            </div>
        </div>
    )
);

EventItem.displayName = "EventItem";

export default function Dashboard({
    statistics,
    recentActivities,
    topPromotors,
    chartData,
}: DashboardProps) {
    // Memoized formatters to prevent recreation
    const formatCurrency = useMemo(
        () => (amount: number) => {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
        },
        []
    );

    const formatDate = useMemo(
        () => (dateString: string) => {
            return new Date(dateString).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        },
        []
    );

    const formatTime = useMemo(
        () => (timeString: string) => {
            return timeString
                ? new Date(`1970-01-01T${timeString}`).toLocaleTimeString(
                      "id-ID",
                      {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                      }
                  )
                : "";
        },
        []
    );

    // Memoized top promotors slice
    const topThreePromotors = useMemo(
        () => topPromotors.slice(0, 3),
        [topPromotors]
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Dashboard Admin
                        </h1>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            Ringkasan sistem GOTIX Anda
                        </p>
                    </div>
                </div>

                {/* Main Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<Users className="w-6 h-6" />}
                        title="Total Pengguna"
                        value={statistics.users.total.toLocaleString()}
                        subtitle={`${statistics.users.customers} Customer • ${statistics.users.promotors} Promotor`}
                        color="blue"
                    />
                    <StatCard
                        icon={<Calendar className="w-6 h-6" />}
                        title="Total Acara"
                        value={statistics.events.total.toLocaleString()}
                        subtitle={`${statistics.events.active} Aktif • ${statistics.events.past} Selesai`}
                        color="green"
                    />
                    <StatCard
                        icon={<ShoppingCart className="w-6 h-6" />}
                        title="Total Pesanan"
                        value={statistics.orders.total.toLocaleString()}
                        subtitle={`${statistics.orders.paid} Terbayar • ${statistics.orders.pending} Pending`}
                        color="purple"
                    />
                    <StatCard
                        icon={<DollarSign className="w-6 h-6" />}
                        title="Total Pendapatan"
                        value={formatCurrency(statistics.revenue.total)}
                        subtitle={`Bulan ini: ${formatCurrency(
                            statistics.revenue.monthly
                        )}`}
                        color="yellow"
                    />
                </div>

                {/* Secondary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ticket Statistics */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-indigo-600 text-white rounded-lg p-2">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">
                                Statistik Tiket
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">
                                    Total Tiket
                                </span>
                                <span className="font-bold text-white">
                                    {statistics.tickets.total.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">
                                    Tiket Terjual
                                </span>
                                <span className="font-bold text-emerald-400">
                                    {statistics.tickets.sold.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">
                                    Tiket Tersedia
                                </span>
                                <span className="font-bold text-cyan-400">
                                    {statistics.tickets.available.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Status */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-emerald-600 text-white rounded-lg p-2">
                                <Activity className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">
                                Status Pesanan
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span className="text-gray-300">
                                        Terbayar
                                    </span>
                                </div>
                                <span className="font-bold text-white">
                                    {statistics.orders.paid}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                    <span className="text-gray-300">
                                        Pending
                                    </span>
                                </div>
                                <span className="font-bold text-white">
                                    {statistics.orders.pending}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <XCircle className="w-4 h-4 text-red-400" />
                                    <span className="text-gray-300">
                                        Lainnya
                                    </span>
                                </div>
                                <span className="font-bold text-white">
                                    {statistics.orders.cancelled}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Top Promotors */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-purple-600 text-white rounded-lg p-2">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">
                                Top Promotor
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {topThreePromotors.length > 0 ? (
                                topThreePromotors.map((promotor, index) => (
                                    <div
                                        key={promotor.id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    index === 0
                                                        ? "bg-yellow-500 text-white"
                                                        : index === 1
                                                        ? "bg-gray-500 text-white"
                                                        : "bg-orange-500 text-white"
                                                }`}
                                            >
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-300 font-medium">
                                                {promotor.name}
                                            </span>
                                        </div>
                                        <span className="font-bold text-white text-sm">
                                            {formatCurrency(
                                                promotor.total_revenue
                                            )}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 py-4">
                                    Belum ada data promotor
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                            Trend Pesanan (6 Bulan Terakhir)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData.monthlyOrders}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#9CA3AF" }}
                                />
                                <YAxis tick={{ fill: "#9CA3AF" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        border: "1px solid #374151",
                                        borderRadius: "8px",
                                        color: "#F9FAFB",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#06B6D4"
                                    strokeWidth={2}
                                    dot={{ fill: "#06B6D4", r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            Trend Pendapatan (6 Bulan Terakhir)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData.monthlyRevenue}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#9CA3AF" }}
                                />
                                <YAxis
                                    tick={{ fill: "#9CA3AF" }}
                                    tickFormatter={formatCurrency}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        border: "1px solid #374151",
                                        borderRadius: "8px",
                                        color: "#F9FAFB",
                                    }}
                                    formatter={(value) => [
                                        formatCurrency(Number(value)),
                                        "Pendapatan",
                                    ]}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#10B981"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-blue-400" />
                            Pesanan Terbaru
                        </h3>
                        <div className="space-y-3">
                            {recentActivities.orders.length > 0 ? (
                                recentActivities.orders.map((order) => (
                                    <OrderItem
                                        key={order.id}
                                        order={order}
                                        formatCurrency={formatCurrency}
                                        formatDate={formatDate}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-400 py-8">
                                    Belum ada pesanan terbaru
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            Acara Terbaru
                        </h3>
                        <div className="space-y-3">
                            {recentActivities.events.length > 0 ? (
                                recentActivities.events.map((event) => (
                                    <EventItem
                                        key={event.id}
                                        event={event}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-400 py-8">
                                    Belum ada acara terbaru
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
