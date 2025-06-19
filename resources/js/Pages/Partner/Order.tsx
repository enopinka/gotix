import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
                        <CardContent className="p-4 ">
                            <div className="flex justify-between mb-4">
                                <div className="">
                                    <p className="text-lg font-semibold">
                                        {event.title}
                                    </p>
                                    <p className="font-light">
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                        ,{" "}
                                        {event.time
                                            .slice(0, 5)
                                            .replace(":", ".")}
                                    </p>
                                </div>
                                <div className="flex gap-4 w-fit text-center">
                                    <div className="w-full">
                                        <p className="font-semibold">Kuota</p>
                                        <p>{event.quota ?? 0}</p>
                                    </div>
                                    <div className="w-full">
                                        <p className="font-semibold">Terjual</p>
                                        <p>{event.orders.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    onClick={() =>
                                        router.get(`/partner/order/${event.id}`)
                                    }
                                    className="text-center bg-transparent text-blue-600 hover:underline hover:bg-transparent"
                                >
                                    Lihat Detail
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PartnerLayout>
    );
}
