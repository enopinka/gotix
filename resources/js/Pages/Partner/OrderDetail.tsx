import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

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

export default function Orderdetail({ event, orders }: OrderDetailProps) {
    const eventWithDate = {
        ...event,
        date: new Date(`${event.date}T${event.time}`),
    };
    return (
        <PartnerLayout>
            <div>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <h2 className="text-xl font-semibold text-accent-foreground">
                        {event.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                            {eventWithDate.date.toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                            {eventWithDate.date.toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Asia/Jakarta", // sesuaikan zona waktu
                            })}{" "}
                            WIB
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{event.place}</span>
                    </div>
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nama Pengguna</TableHead>
                            <TableHead className="">Tipe Tiket</TableHead>
                            <TableHead>Kuantitas</TableHead>
                            <TableHead>Total Harga</TableHead>
                            <TableHead className="">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length !== 0 ? (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.ticket_type}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.total_price}</TableCell>
                                    <TableCell className="text-right">
                                        {order.status === "pending" && (
                                            <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Pending</p>
                                            </div>
                                        )}
                                        {order.status === "paid" && (
                                            <div className="bg-blue-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Paid</p>
                                            </div>
                                        )}
                                        {order.status === "expired" && (
                                            <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Expired</p>
                                            </div>
                                        )}
                                        {order.status === "failed" && (
                                            <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Gagal</p>
                                            </div>
                                        )}
                                        {order.status === "canceled" && (
                                            <div className="bg-slate-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Canceled</p>
                                            </div>
                                        )}
                                        {order.status === "checked-in" && (
                                            <div className="bg-green-600 text-white rounded-md px-2 py-1 w-fit">
                                                <p>Sudah Masuk</p>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Tidak ada pembeli ditemukan
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </PartnerLayout>
    );
}
