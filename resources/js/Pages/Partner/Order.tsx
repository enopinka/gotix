import { Card, CardContent } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";

type Order = {
    id: number;
    name: string;
    quantity: number;
    total_price: number;
    status: string;
};

type Event = {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    orders: Order[];
};

type OrderProps = {
    events: Event[];
};

export default function Order({ events }: OrderProps) {
    // console.log(events);
    return (
        <PartnerLayout>
            <p className="text-2xl font-bold my-4">Pesanan</p>
            <div>
                {events.map((event) => (
                    <Card key={event.id} className="my-4">
                        <CardContent className="p-4">
                            <div>
                                <p className="text-lg font-semibold">
                                    {event.title}
                                </p>
                                <p className="font-light">
                                    {new Date(event.date).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                    , {event.time.slice(0, 5).replace(":", ".")}
                                </p>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">
                                            Nama Pengguna
                                        </TableHead>
                                        <TableHead>Kuantitas</TableHead>
                                        <TableHead>Total Harga</TableHead>
                                        <TableHead className="">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {event.orders.length !== 0 ? (
                                        event.orders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    {order.name}
                                                </TableCell>
                                                <TableCell>
                                                    {order.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    {order.total_price}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {order.status ===
                                                        "pending" && (
                                                        <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Pending</p>
                                                        </div>
                                                    )}
                                                    {order.status ===
                                                        "paid" && (
                                                        <div className="bg-blue-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Paid</p>
                                                        </div>
                                                    )}
                                                    {order.status ===
                                                        "expired" && (
                                                        <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Expired</p>
                                                        </div>
                                                    )}
                                                    {order.status ===
                                                        "failed" && (
                                                        <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Gagal</p>
                                                        </div>
                                                    )}
                                                    {order.status ===
                                                        "canceled" && (
                                                        <div className="bg-slate-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Canceled</p>
                                                        </div>
                                                    )}
                                                    {order.status ===
                                                        "checked-in" && (
                                                        <div className="bg-green-600 text-white rounded-md px-2 py-1 w-fit">
                                                            <p>Sudah Masuk</p>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center"
                                            >
                                                Tidak ada pembeli ditemukan
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PartnerLayout>
    );
}
