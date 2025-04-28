import React from "react";
import { Head } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";

// Define TypeScript interfaces for our data structures
interface TicketType {
    id: number;
    event_id: number;
    user_id: number;
    type: string;
    price: number;
    quota: number;
    available_seats: number;
}

interface EventType {
    id: number;
    title: string;
    description: string;
    place: string;
    date: string;
    time: string;
    poster: string;
    seating_chart: string;
    user_id: number;
}

interface OrderType {
    id: number;
    user_id: number;
    event_id: number;
    ticket_id: number;
    quantity: number;
    total_price: number;
    status: string;
    created_at: string;
    updated_at: string;
    ticket: TicketType;
    event: EventType;
}

interface MyTicketsProps {
    orders: OrderType[];
}

export default function MyTickets({
    orders,
}: MyTicketsProps): React.ReactElement {
    return (
        <CustomerLayout>
            <Head title="Tiket Saya" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Tiket Saya
                    </h1>
                    <p className="text-gray-600">
                        Riwayat pembelian tiket event Anda
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <Ticket size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Belum Ada Tiket
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Anda belum memiliki tiket. Jelajahi event menarik
                            dan beli tiket sekarang!
                        </p>
                        <a
                            href="/"
                            className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Jelajahi Event
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800 mb-1">
                                                {order.event.title}
                                            </h2>
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <Calendar
                                                    size={16}
                                                    className="mr-1"
                                                />
                                                <span className="text-sm">
                                                    {new Date(
                                                        order.event.date
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <Clock
                                                    size={16}
                                                    className="mr-1"
                                                />
                                                <span className="text-sm">
                                                    {order.event.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MapPin
                                                    size={16}
                                                    className="mr-1"
                                                />
                                                <span className="text-sm">
                                                    {order.event.place}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                                {order.ticket.type}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Order ID: #{order.id}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                        <div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">
                                                    {order.quantity}x
                                                </span>{" "}
                                                tiket
                                            </div>
                                            <div className="text-lg font-bold text-gray-800">
                                                Rp{" "}
                                                {order.total_price.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    order.status === "paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {order.status === "paid"
                                                    ? "Sukses"
                                                    : "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
