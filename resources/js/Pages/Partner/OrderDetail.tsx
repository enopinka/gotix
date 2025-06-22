import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Button } from "@/Components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, CheckCircle2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { useState } from "react";

type Order = {
    id: number;
    name: string;
    quantity: number;
    ticket_type: string;
    total_price: number;
    status: string;
};

type Event = {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    place: string;
    poster: string;
    seating_chart: string;
};

type OrderDetailProps = {
    event: Event;
    orders: Order[];
};

const statusColor = {
    pending: "bg-red-600",
    settlement: "bg-blue-600",
    expired: "bg-red-600",
    failed: "bg-red-600",
    canceled: "bg-slate-600",
    "checked-in": "bg-green-600",
};

const statusLabel = {
    pending: "Pending",
    settlement: "Paid",
    expired: "Expired",
    failed: "Gagal",
    canceled: "Canceled",
    "checked-in": "Sudah Masuk",
};

export default function Orderdetail({ event, orders }: OrderDetailProps) {
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleConfirm = (orderId: number, newStatus: string) => {
        setLoadingId(orderId);
        router.put(
            `/partner/order/${orderId}/status`,
            { status: newStatus },
            {
                onFinish: () => setLoadingId(null),
            }
        );
    };

    const eventWithDate = {
        ...event,
        date: new Date(`${event.date}T${event.time}`),
    };

    return (
        <PartnerLayout>
            <div className="max-w-5xl mx-auto py-8 space-y-8">
                {/* Event Info Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center">
                    <img
                        src={event.poster}
                        alt={event.title}
                        className="w-full md:w-64 h-48 object-cover rounded-xl shadow"
                    />
                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                            {event.title}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarIcon className="w-5 h-5" />
                            <span>
                                {eventWithDate.date.toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <ClockIcon className="w-5 h-5" />
                            <span>
                                {eventWithDate.date.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Asia/Jakarta",
                                })} WIB
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPinIcon className="w-5 h-5" />
                            <span>{event.place}</span>
                        </div>
                        <p className="text-gray-500 mt-2">{event.description}</p>
                    </div>
                </div>

                {/* Table Orders */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Daftar Pembeli Tiket</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Pengguna</TableHead>
                                <TableHead>Tipe Tiket</TableHead>
                                <TableHead>Kuantitas</TableHead>
                                <TableHead>Total Harga</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length !== 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.ticket_type}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>
                                            Rp {order.total_price.toLocaleString("id-ID")}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`text-white rounded-md px-2 py-1 w-fit text-xs font-semibold ${statusColor[order.status as keyof typeof statusColor]}`}
                                            >
                                                {statusLabel[order.status as keyof typeof statusLabel]}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {/* Tampilkan tombol konfirmasi jika status pending/paid */}
                                            {order.status === "pending" && (
                                                <Button
                                                    size="sm"
                                                    className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                                                    disabled={loadingId === order.id}
                                                    onClick={() =>
                                                        handleConfirm(order.id, "settlement")
                                                    }
                                                >
                                                    {loadingId === order.id ? (
                                                        <span>Memproses...</span>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Konfirmasi Bayar
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                            {order.status === "settlement" && (
                                                <Button
                                                    size="sm"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
                                                    disabled={loadingId === order.id}
                                                    onClick={() =>
                                                        handleConfirm(order.id, "checked-in")
                                                    }
                                                >
                                                    {loadingId === order.id ? (
                                                        <span>Memproses...</span>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Tandai Sudah Masuk
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                        Tidak ada pembeli ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </PartnerLayout>
    );
}