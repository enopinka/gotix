import CustomerLayout from "@/Layouts/CustomerLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area"


type Event = {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    place: string;
    poster: string;
    seating_chart: string;
    categories: {
        id: number;
        type: string;
        price: number;
        quota: number;
        available_seats: number;
    }[];
};

type EventDetailProps = {
    event: Event;
};

export default function DetailsEvent({ event }: EventDetailProps) {
    console.log("Event data:", event);
    console.log("Categories:", event.categories);

    const eventWithDate = {
        ...event,
        date: new Date(event.date),
    };

    const handleBuyTicket = (ticketId: number) => {
        console.log(`Buying ticket for ticket ID: ${ticketId}`);
        // Add your ticket purchase logic here
    };

    return (
        <>
            <CustomerLayout>
            <div className="max-w-5xl mx-auto py-4 space-y-6">
                <div className="flex flex-col md:flex-row gap-2 items-start">
                    {/* Banner with Dialog */}
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="aspect-[3/4] max-w-md cursor-pointer overflow-hidden rounded-xl group">
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden">
                                <img
                                    src={event.poster}
                                    alt={event.title}
                                    className="w-full h-auto object-contain"
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className=" px-6 flex flex-col gap-6">
                        {/* Info Card */}
                        <Card className="w-full">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-xl font-semibold">{event.title}</h2>
                                <div className="space-y-2 text-sm text-muted-foreground">
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
                                                timeZone: "Asia/Jakarta",
                                            })}{" "}
                                            WIB
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span>{event.place}</span>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    Diselenggarakan oleh <b>Flabbergast Productions</b>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <ScrollArea className=" h-[200px] w-[500px] rounded-md border p-4">
                        <Tabs defaultValue="ticket">
                            <TabsList className="w-full">
                                <TabsTrigger value="desc" className="w-full">Deskripsi</TabsTrigger>
                                <TabsTrigger value="ticket" className="w-full">Tiket</TabsTrigger>
                            </TabsList>

                            <TabsContent value="desc" className="pt-4">
                                <p className="py-1 text-justify">
                                    Details: {event.description}
                                </p>
                            </TabsContent>

                            <TabsContent value="ticket" className="pt-4">
                                <div className="flex flex-col gap-2">
                                    {event.categories?.length > 0 ? (
                                        event.categories.map((category) => (
                                            <Card key={category.id} className="w-full">
                                                <CardContent className="p-4 flex justify-between items-center">
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{category.type}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            Harga: Rp {category.price.toLocaleString("id-ID")}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Kuota: {category.quota} orang
                                                        </p>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleBuyTicket(category.id)}
                                                    >
                                                        Beli Tiket
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted-foreground">Tidak ada kategori tiket tersedia.</p>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                        </ScrollArea>
                    </div>
                </div>

            </div>
        </CustomerLayout>
        </>
    );
}
