import React from "react";
import { Head } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";

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
}

interface EventInfoProps {
    icon: React.ElementType;
    text: string;
}

interface TicketCardProps {
    order: OrderType;
}

export default function MyTickets({ orders = [] }: { orders?: OrderType[] }) {
    // Komponen untuk menampilkan info event dengan icon
    const EventInfo: React.FC<EventInfoProps> = ({ icon: Icon, text }) => (
        <div className="flex items-center text-gray-600 mb-1">
            <Icon size={16} className="mr-1" />
            <span className="text-sm">{text}</span>
        </div>
    );

    // Komponen untuk kartu tiket
    const TicketCard: React.FC<TicketCardProps> = ({ order }) => {
        const isPastEvent = new Date(order.event.date) < new Date();

        return (
            <div
                key={order.id}
                className={`bg-white rounded-lg shadow p-4 sm:p-6 ${
                    isPastEvent ? "opacity-50 pointer-events-none" : ""
                }`}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                    {/* Info Event */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            {order.event.title}
                        </h2>
                        <EventInfo
                            icon={Calendar}
                            text={new Date(order.event.date).toLocaleDateString(
                                "id-ID",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        />
                        <EventInfo icon={Clock} text={order.event.time} />
                        <EventInfo icon={MapPin} text={order.event.place} />
                    </div>

                    {/* Info Tiket */}
                    <div className="text-right">
                        <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                            {order.ticket.type}
                        </div>
                        <div className="text-sm text-gray-600">
                            Order ID: #{order.id}
                        </div>
                    </div>
                </div>

                {/* Info Harga dan Status */}
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">{order.quantity}x</span>{" "}
                            tiket
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                            Rp {order.total_price.toLocaleString("id-ID")}
                        </div>
                    </div>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {order.status === "paid" ? "Sukses" : "Pending"}
                    </span>
                </div>
            </div>
        );
    };

    // Komponen untuk status kosong
    const EmptyState = () => (
        <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="flex justify-center mb-4">
                <Ticket size={48} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                Belum Ada Tiket
            </h3>
            <p className="text-gray-600 mb-4">
                Anda belum memiliki tiket. Jelajahi event menarik dan beli tiket
                sekarang!
            </p>
            <a
                href="/"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
                Jelajahi Event
            </a>
        </div>
    );

    return (
        <CustomerLayout>
            <Head title="Tiket Saya" />
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Tiket Saya
                    </h1>
                    <p className="text-gray-600">
                        Riwayat pembelian tiket event Anda
                    </p>
                </div>

                {orders.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4 py-4">
                        {orders.map((order) => (
                            <TicketCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
