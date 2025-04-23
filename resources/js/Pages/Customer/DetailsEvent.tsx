import CustomerLayout from "@/Layouts/CustomerLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useState } from "react";

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
    const eventWithDate = {
        ...event,
        date: new Date(event.date),
    };

    const [open, setOpen] = useState(false);

    return (
        <>
            <CustomerLayout>
            <div className="max-w-5xl mx-auto py-4 space-y-6">
                <div className="flex flex-col md:flex-row gap-2 items-start">
                    {/* Banner with Dialog */}
                    <div className="md:w-2/3">
                        <Dialog open={open} onOpenChange={setOpen}>
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
                    <div className="flex flex-col md:w-1/3 gap-6">
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
                        <ScrollArea className=" h-[200px] w-[350px] rounded-md border p-4">
                        <Tabs defaultValue="ticket">
                            <TabsList className="w-full">
                                <TabsTrigger value="desc" className="w-full">Deskripsi</TabsTrigger>
                                <TabsTrigger value="ticket" className="w-full">Tiket</TabsTrigger>
                            </TabsList>

                            <TabsContent value="desc" className="pt-4">
                                <p className="py-1 text-justify">
                                    ✨ Short n’ Sweet is Sabrina Carpenter’s shimmering pop return —
                                    bold, flirty, and irresistibly catchy. With a kiss mark on her
                                    shoulder and a soft retro glow, the album cover perfectly captures
                                    the essence of the songs inside: a mix of confidence, cheekiness,
                                    and vulnerability. Dibalut dalam visual ala 70s glam, Sabrina tampil
                                    fierce dan feminin, menatap tajam dengan pancaran warna violet dan
                                    gold yang dreamy. Setiap track seperti Espresso, Bed Chem, dan Please
                                    Please Please menawarkan cerita pendek nan manis — just like the title.
                                    Whether it’s about love, heartbreak, or playful sarcasm, Short n’ Sweet
                                    is a capsule of emotions wrapped in sugar-pop brilliance.
                                </p>
                            </TabsContent>

                            <TabsContent value="ticket" className="pt-4 space-y-4">
                                <Card>
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-semibold">Fansign Event</h4>
                                            <p className="text-xs text-muted-foreground">Mulai dari Rp429.000</p>
                                        </div>
                                        <Button>Beli Tiket</Button>
                                    </CardContent>
                                </Card>
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
