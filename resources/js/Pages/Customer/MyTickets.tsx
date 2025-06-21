import React, { useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import {
    Calendar,
    Clock,
    MapPin,
    Ticket,
    Download,
    Share2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";

// Tipe data yang digunakan
interface TicketType {
    type: string;
}

interface EventType {
    title: string;
    place: string;
    date: string;
    time: string;
}

interface OrderType {
    id: number;
    quantity: number;
    total_price: number;
    status: string;
    ticket: TicketType;
    event: EventType;
    snap_token: string;
}

interface EventInfoProps {
    icon: React.ElementType;
    text: string;
    className?: string;
}

interface TicketCardProps {
    order: OrderType;
    index: number;
}

export default function MyTickets({ orders = [] }: { orders?: OrderType[] }) {
    // Komponen untuk menampilkan info event dengan icon
    const EventInfo: React.FC<EventInfoProps> = ({
        icon: Icon,
        text,
        className = "",
    }) => (
        <div className={`flex items-center text-gray-300 mb-2 ${className}`}>
            <Icon size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">{text}</span>
        </div>
    );

    useEffect(() => {
        // Client key dari .env
        const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        // Buat script tag Snap.js
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePay = (snap_token: string, id: number) => {
        if (window.snap) {
            window.snap.pay(snap_token, {});
        } else {
            console.error("Snap not loaded yet!");
        }
    };

    // Komponen untuk kartu tiket
    const TicketCard: React.FC<TicketCardProps> = ({ order, index }) => {
        const isPastEvent = new Date(order.event.date) < new Date();
        const orderStatus = order.status;

        const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                    isPastEvent
                        ? "bg-gray-800/40 opacity-60 hover:opacity-80 border border-gray-700/50"
                        : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                }`}
            >
                {/* Gradient overlay untuk efek modern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-6">
                    {/* Header dengan status */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                                <Ticket className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Order #{order.id}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    {orderStatus === "settlement" ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                                    )}
                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            orderStatus === "settlement"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        }`}
                                    >
                                        {orderStatus === "settlement"
                                            ? "TERBAYAR"
                                            : "PENDING"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Ticket type badge */}
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                            {order.ticket.type}
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                            {order.event.title}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <EventInfo
                                icon={Calendar}
                                text={formatDate(order.event.date)}
                            />
                            <EventInfo
                                icon={Clock}
                                text={`${order.event.time} WIB`}
                            />
                            <EventInfo
                                icon={MapPin}
                                text={order.event.place}
                                className="sm:col-span-3"
                            />
                        </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center mb-6 p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
                        <div>
                            <div className="text-sm text-gray-400 mb-1">
                                Total Tiket
                            </div>
                            <div className="text-lg font-bold text-white">
                                {order.quantity}x tiket
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400 mb-1">
                                Total Harga
                            </div>
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Rp {order.total_price.toLocaleString("id-ID")}
                            </div>
                        </div>

                        {/* Action buttons */}
                        {/* {orderStatus === "settlement" && !isPastEvent && (
                            // <div className="flex gap-3">
                            //     <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 group">
                            //         <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            //         Download Tiket
                            //     </button>
                            //     <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500">
                            //         <Share2 className="w-4 h-4" />
                            //     </button>
                            // </div>
                        )} */}
                    </div>
                    <div className=" flex justify-end gap-4">
                        <Button
                            onClick={() =>
                                handlePay(order.snap_token, order.id)
                            }
                            className={`bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${
                                orderStatus === "pending" ? "block" : "hidden"
                            }`}
                        >
                            Bayar
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                            onClick={() =>
                                window.open(`/invoice/${order.id}`, "_blank")
                            }
                        >
                            Invoice
                        </Button>
                    </div>
                    {isPastEvent && (
                        <div className="text-center py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                            <span className="text-gray-400 font-medium">
                                Event Telah Selesai
                            </span>
                        </div>
                    )}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl translate-y-12 -translate-x-12" />
            </motion.div>
        );
    };

    // Komponen untuk status kosong
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-12 text-center border border-gray-700/50 overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl translate-y-16 -translate-x-16" />

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl">
                        <Ticket size={48} className="text-blue-400" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    Belum Ada Tiket
                </h3>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    Anda belum memiliki tiket. Jelajahi event menarik dan beli
                    tiket sekarang untuk mendapatkan pengalaman tak terlupakan!
                </p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transform"
                >
                    <Calendar className="w-5 h-5" />
                    Jelajahi Event
                </a>
            </div>
        </motion.div>
    );

    // Filter dan sort orders
    const upcomingOrders = orders
        .filter((order) => new Date(order.event.date) >= new Date())
        .sort(
            (a, b) =>
                new Date(a.event.date).getTime() -
                new Date(b.event.date).getTime()
        );

    const pastOrders = orders
        .filter((order) => new Date(order.event.date) < new Date())
        .sort(
            (a, b) =>
                new Date(b.event.date).getTime() -
                new Date(a.event.date).getTime()
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <CustomerLayout>
                <Head title="Tiket Saya" />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-2xl py-12 px-8 border border-gray-700/50 shadow-xl"
                    >
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Tiket Saya
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Kelola dan lihat semua tiket event Anda dalam satu
                            tempat
                        </p>
                    </motion.div>

                    {orders.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-12">
                            {/* Upcoming Events */}
                            {upcomingOrders.length > 0 && (
                                <section>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-3">
                                            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                                            Event Mendatang
                                        </h2>
                                        <p className="text-gray-400">
                                            Tiket untuk event yang akan datang
                                        </p>
                                    </motion.div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {upcomingOrders.map((order, index) => (
                                            <>
                                                {" "}
                                                <TicketCard
                                                    key={`upcoming-${order.id}`}
                                                    order={order}
                                                    index={index}
                                                />
                                            </>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Past Events */}
                            {pastOrders.length > 0 && (
                                <section className="border-t border-gray-700/50 pt-12">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2,
                                        }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                            <div className="w-1 h-8 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full" />
                                            Riwayat Event
                                        </h2>
                                        <p className="text-gray-400">
                                            Tiket untuk event yang telah selesai
                                        </p>
                                    </motion.div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {pastOrders.map((order, index) => (
                                            <TicketCard
                                                key={`past-${order.id}`}
                                                order={order}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </CustomerLayout>
        </div>
    );
}
