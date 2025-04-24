import CustomerLayout from "@/Layouts/CustomerLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useState } from "react";


type Event = {
    id: number;
    title: string;
    description: string;
    partner_name: string;
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
    isLoggedIn: boolean; // Tambahkan properti ini
};

export default function DetailsEvent({ event, isLoggedIn }: EventDetailProps) {
    const handleCheckout = (ticketId: number) => {
        if (!isLoggedIn) {
            // Arahkan ke halaman login jika belum login
            window.location.href = `/login`;
        } else {
            console.log(`Proceeding to checkout for ticket ID: ${ticketId}`);
        }
    };

    const eventWithDate = {
        ...event,
        date: new Date(`${event.date}T${event.time}`),
    };

    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const calculateTotal = (price: number, quantity: number) => {
        const subtotal = price * quantity;
        const serviceFee = quantity * 10000; 
        const tax = subtotal * 0.1; // Pajak 10%
        const total = subtotal + serviceFee + tax;
        return { subtotal, serviceFee, tax, total };
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
                        <div className="px-6 flex flex-col gap-6">
                            {/* Info Card */}
                            <Card className="w-full">
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        {event.title}
                                    </h2>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>
                                                {eventWithDate.date.toLocaleDateString(
                                                    "id-ID",
                                                    {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>
                                                {eventWithDate.date.toLocaleTimeString(
                                                    "id-ID",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        timeZone:
                                                            "Asia/Jakarta",
                                                    }
                                                )}{" "}
                                                WIB
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="w-4 h-4" />
                                            <span>{event.place}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <p>
                                            Diselenggarakan oleh{" "}
                                            <span className="font-bold">
                                                {event.partner_name}
                                            </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tabs */}
                            <Tabs defaultValue="ticket">
                                <TabsList className="w-full mb-2">
                                    <TabsTrigger
                                        value="desc"
                                        className="w-full"
                                    >
                                        Deskripsi
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="ticket"
                                        className="w-full"
                                    >
                                        Tiket
                                    </TabsTrigger>
                                </TabsList>

                                <ScrollArea className="h-[320px] w-[500px] rounded-md border px-4">
                                    <TabsContent value="desc" className="pt-4">
                                        <p className="py-1 text-justify">
                                            Details: {event.description}
                                        </p>
                                    </TabsContent>

                                    <TabsContent
                                        value="ticket"
                                        className="py-4"
                                    >
                                        <div className="flex flex-col gap-2">
                                            {event.categories?.length > 0 ? (
                                                event.categories.map(
                                                    (category) => (
                                                        <Card
                                                            key={category.id}
                                                            className="w-full"
                                                        >
                                                            <CardContent className="p-4 space-y-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold">
                                                                            {category.type}
                                                                        </h3>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Harga: Rp{" "}
                                                                            {category.price.toLocaleString("id-ID")}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Kuota: {category.quota} orang
                                                                        </p>
                                                                    </div>
                                                                    <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                                                                        On Sale
                                                                    </span>
                                                                </div>
                                                                {selectedTicket === category.id ? (
                                                                    <div>
                                                                        <div className="flex items-center gap-4">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                                                                                }
                                                                            >
                                                                                -
                                                                            </Button>
                                                                            <span className="text-lg font-semibold">{quantity}</span>
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setQuantity((prev) =>
                                                                                        prev < category.available_seats ? prev + 1 : prev
                                                                                    )
                                                                                }
                                                                                disabled={quantity >= category.available_seats}
                                                                            >
                                                                                +
                                                                            </Button>
                                                                        </div>
                                                                        <div className="flex justify-end gap-4 mt-4">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() => {
                                                                                    setSelectedTicket(null);
                                                                                    setQuantity(1); // Reset quantity
                                                                                }}
                                                                            >
                                                                                Batal
                                                                            </Button>
                                                                            <Dialog>
                                                                                <DialogTrigger asChild>
                                                                                    <Button>
                                                                                        Beli
                                                                                    </Button>
                                                                                </DialogTrigger>
                                                                                <DialogContent className="max-w-lg p-6 space-y-4 rounded-lg shadow-lg bg-white">
                                                                                    <h4 className="text-lg font-semibold">
                                                                                        Rincian Pemesanan
                                                                                    </h4>
                                                                                    <div className="space-y-4">
                                                                                        <div className="flex items-center gap-4">
                                                                                            <img
                                                                                                src={event.poster}
                                                                                                alt={event.title}
                                                                                                className="w-16 h-16 rounded-lg object-cover"
                                                                                            />
                                                                                            <div>
                                                                                                <h5 className="text-md font-semibold">
                                                                                                    {event.title}
                                                                                                </h5>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                    {category.type}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            {(() => {
                                                                                                const { subtotal, serviceFee, tax, total } = calculateTotal(category.price, quantity);
                                                                                                return (
                                                                                                    <>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>Subtotal</span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {subtotal.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>Biaya Layanan</span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {serviceFee.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>Pajak (10%)</span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {tax.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <hr />
                                                                                                        <div className="flex justify-between font-semibold">
                                                                                                            <span>Total</span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {total.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </>
                                                                                                );
                                                                                            })()}
                                                                                        </div>
                                                                                        <Button
                                                                                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                                                                            onClick={() =>
                                                                                                handleCheckout(category.id)
                                                                                            }
                                                                                        >
                                                                                            Lanjutkan
                                                                                        </Button>
                                                                                    </div>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex justify-end">
                                                                        <Button
                                                                            onClick={() =>
                                                                                setSelectedTicket(category.id)
                                                                            }
                                                                            className="bg-blue-600 text-white hover:bg-blue-700"
                                                                        >
                                                                            Pilih
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                )
                                            ) : (
                                                <p className="text-center text-muted-foreground">
                                                    Tidak ada kategori tiket
                                                    tersedia.
                                                </p>
                                            )}
                                        </div>
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
