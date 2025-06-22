import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { router } from "@inertiajs/react";

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
    place: string;
    quota: string;
    poster?: string; // pastikan ada field poster
    orders: Order[];
};

type OrderProps = {
    events: Event[];
};

export default function Order({ events }: OrderProps) {
    return (
        <PartnerLayout>
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-8">
                    Pesanan Tiket Event Anda
                </h1>
                {events.length === 0 ? (
                    <div className="text-center text-gray-500 py-16">
                        Belum ada event dengan pesanan tiket.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <Card
                                key={event.id}
                                className="rounded-2xl shadow-lg border-0 bg-white flex flex-col h-full"
                            >
                                {event.poster && (
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-t-2xl"
                                    />
                                )}
                                <CardContent className="flex-1 flex flex-col p-6">
                                    <div className="mb-4">
                                        <p className="text-lg font-bold text-gray-800 mb-1 truncate" title={event.title}>
                                            {event.title}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(event.date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                            , {event.time.slice(0, 5).replace(":", ".")}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1 truncate" title={event.place}>
                                            {event.place}
                                        </p>
                                    </div>
                                    <div className="flex gap-6 mb-4">
                                        <div className="text-center flex-1">
                                            <p className="font-semibold text-blue-500">Kuota</p>
                                            <p className="text-lg font-bold">{event.quota ?? 0}</p>
                                        </div>
                                        <div className="text-center flex-1">
                                            <p className="font-semibold text-cyan-500">Terjual</p>
                                            <p className="text-lg font-bold">{event.orders.length}</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            router.get(`/partner/order/${event.id}`)
                                        }
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 mt-auto w-full"
                                    >
                                        Lihat Detail
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </PartnerLayout>
    );
}