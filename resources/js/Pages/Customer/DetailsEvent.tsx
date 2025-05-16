import CustomerLayout from "@/Layouts/CustomerLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogHeader,
} from "@/Components/ui/dialog";
import { CalendarIcon, MapPinIcon, ClockIcon, Plus, Minus } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { router, usePage } from "@inertiajs/react";
import ReactCardFlip from "react-card-flip";

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
};

export default function DetailsEvent({ event }: EventDetailProps) {
    const { auth } = usePage().props;
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => setIsFlipped((prev) => !prev);

    const handleCheckout = async (
        ticketId: number,
        quantity: number,
        totalPrice: number
    ) => {
        if (!auth.user) {
            return router.get("/login");
        }

        try {
            router.post(
                "/orders",
                {
                    ticket_id: ticketId,
                    quantity: quantity,
                    total_price: totalPrice,
                },
                {
                    onSuccess: () => {
                        setShowSuccessDialog(true);
                    },
                    onError: (error: any) => {
                        console.error("ERROR:", error);
                        alert(
                            `Gagal memproses pesanan: ${
                                error.message || "Terjadi kesalahan"
                            }`
                        );
                    },
                }
            );
            // const response = await fetch("/orders", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "X-CSRF-TOKEN":
            //             document
            //                 .querySelector('meta[name="csrf-token"]')
            //                 ?.getAttribute("content") || "",
            //     },
            //     credentials: "same-origin",
            //     body: JSON.stringify({
            //         ticket_id: ticketId,
            //         quantity: quantity,
            //     }),
            // });
            // if (response.redirected) {
            //     window.location.href = response.url;
            //     return;
            // }
            // if (response.ok) {
            //     // ✅ Tambahkan di sini untuk memunculkan dialog sukses
            //     setShowSuccessDialog(true);
            // } else {
            //     const data = await response.json();
            //     alert(
            //         `Gagal memproses pesanan: ${
            //             data.message || "Terjadi kesalahan"
            //         }`
            //     );
            // }
        } catch (error: any) {
            console.error("DETAIL ERROR:", error);
            alert("Terjadi kesalahan saat mengirim data: " + error.message);
        }
    };

    // console.log("Is Logged In:", isLoggedIn);

    const eventWithDate = {
        ...event,
        date: new Date(`${event.date}T${event.time}`),
    };

    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);

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
                <div className="max-w-5xl mx-auto py-4 space-y-6 ">
                    <div className="flex flex-col md:flex-row gap-2 items-start ">
                        {/* Banner with Dialog */}
                        <div className="w-md">
                            {event.seating_chart ? (
                                <ReactCardFlip
                                    isFlipped={isFlipped}
                                    flipDirection="horizontal"
                                >
                                    <div
                                        key="front"
                                        onClick={handleClick}
                                        className="aspect-[3/4] w-md cursor-pointer overflow-hidden rounded-xl group"
                                    >
                                        <img
                                            src={event.poster}
                                            alt={event.title}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div
                                        key="back"
                                        onClick={handleClick}
                                        className="aspect-[3/4] w-md cursor-pointer overflow-hidden rounded-xl group"
                                    >
                                        <img
                                            src={event.seating_chart}
                                            alt={`${event.title} Seating Chart`}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </ReactCardFlip>
                            ) : (
                                <div className="aspect-[3/4] w-md overflow-hidden rounded-xl group">
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            {/* <div className="aspect-[3/4] max-w-md cursor-pointer overflow-hidden rounded-xl group">
                                <img
                                    src={event.poster}
                                    alt={event.title}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div> */}
                            {/* <Dialog>
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
                                    <DialogTitle className="hidden">
                                        {event.title}
                                    </DialogTitle>
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="w-full h-auto object-contain"
                                    />
                                </DialogContent>
                            </Dialog> */}
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
                                        <Card>
                                            <CardContent className="p-4">
                                                <p className="py-1 text-justify whitespace-pre-line text-sm">
                                                    {event.description}
                                                </p>
                                            </CardContent>
                                        </Card>
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
                                                            className={`w-full ${
                                                                category.available_seats ===
                                                                0
                                                                    ? "bg-gray-200 text-gray-500"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <CardContent className="p-4 space-y-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold">
                                                                            {
                                                                                category.type
                                                                            }
                                                                        </h3>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Harga:
                                                                            Rp{" "}
                                                                            {category.price.toLocaleString(
                                                                                "id-ID"
                                                                            )}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Kuota
                                                                            Tersedia:{" "}
                                                                            {
                                                                                category.available_seats
                                                                            }{" "}
                                                                            orang
                                                                        </p>
                                                                    </div>
                                                                    <span
                                                                        className={`px-2 py-1 text-xs font-semibold rounded ${
                                                                            category.available_seats ===
                                                                            0
                                                                                ? "bg-gray-300 text-gray-500"
                                                                                : "text-blue-600 bg-blue-100"
                                                                        }`}
                                                                    >
                                                                        {category.available_seats ===
                                                                        0
                                                                            ? "Habis"
                                                                            : "On Sale"}
                                                                    </span>
                                                                </div>
                                                                {selectedTicket ===
                                                                category.id ? (
                                                                    <div>
                                                                        <div className="flex items-center gap-4">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setQuantity(
                                                                                        (
                                                                                            prev
                                                                                        ) =>
                                                                                            prev >
                                                                                            1
                                                                                                ? prev -
                                                                                                  1
                                                                                                : 1
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Minus />
                                                                            </Button>
                                                                            <span className="text-lg font-semibold">
                                                                                {
                                                                                    quantity
                                                                                }
                                                                            </span>
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setQuantity(
                                                                                        (
                                                                                            prev
                                                                                        ) =>
                                                                                            prev <
                                                                                            category.available_seats
                                                                                                ? prev +
                                                                                                  1
                                                                                                : prev
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    quantity >=
                                                                                    category.available_seats
                                                                                }
                                                                            >
                                                                                <Plus />
                                                                            </Button>
                                                                        </div>
                                                                        <div className="flex justify-end gap-4 mt-4">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() => {
                                                                                    setSelectedTicket(
                                                                                        null
                                                                                    );
                                                                                    setQuantity(
                                                                                        1
                                                                                    ); // Reset quantity
                                                                                }}
                                                                            >
                                                                                Batal
                                                                            </Button>

                                                                            <Dialog
                                                                                open={
                                                                                    showDetailDialog
                                                                                }
                                                                                onOpenChange={
                                                                                    setShowDetailDialog
                                                                                }
                                                                            >
                                                                                <DialogTrigger
                                                                                    asChild
                                                                                >
                                                                                    <Button>
                                                                                        Beli
                                                                                    </Button>
                                                                                </DialogTrigger>
                                                                                <DialogContent className="max-w-lg p-6 space-y-4 rounded-lg shadow-lg bg-white">
                                                                                    <div>
                                                                                        <DialogTitle className="text-lg font-semibold">
                                                                                            Konfirmasi
                                                                                            Pemesanan
                                                                                        </DialogTitle>
                                                                                        <DialogDescription className="font-muted-foreground">
                                                                                            Mohon
                                                                                            cek
                                                                                            kembali
                                                                                            pesanan
                                                                                            Anda
                                                                                        </DialogDescription>
                                                                                    </div>

                                                                                    <div className="space-y-4">
                                                                                        <div className="flex items-center gap-4">
                                                                                            <img
                                                                                                src={
                                                                                                    event.poster
                                                                                                }
                                                                                                alt={
                                                                                                    event.title
                                                                                                }
                                                                                                className="w-16 h-16 rounded-lg object-cover"
                                                                                            />
                                                                                            <div>
                                                                                                <h5 className="text-md font-semibold">
                                                                                                    {
                                                                                                        event.title
                                                                                                    }
                                                                                                </h5>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                    {
                                                                                                        category.type
                                                                                                    }
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            {(() => {
                                                                                                const {
                                                                                                    subtotal,
                                                                                                    serviceFee,
                                                                                                    tax,
                                                                                                    total,
                                                                                                } =
                                                                                                    calculateTotal(
                                                                                                        category.price,
                                                                                                        quantity
                                                                                                    );
                                                                                                return (
                                                                                                    <>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>
                                                                                                                Subtotal
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {subtotal.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>
                                                                                                                Biaya
                                                                                                                Layanan
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {serviceFee.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="flex justify-between">
                                                                                                            <span>
                                                                                                                Pajak
                                                                                                                (10%)
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {tax.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <hr />
                                                                                                        <div className="flex justify-between font-semibold">
                                                                                                            <span>
                                                                                                                Total
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                Rp{" "}
                                                                                                                {total.toLocaleString(
                                                                                                                    "id-ID"
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <Button
                                                                                                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                                                                                            onClick={async () => {
                                                                                                                await handleCheckout(
                                                                                                                    category.id,
                                                                                                                    quantity,
                                                                                                                    total
                                                                                                                );
                                                                                                                setShowDetailDialog(
                                                                                                                    false
                                                                                                                ); // Tutup dialog rincian
                                                                                                            }}
                                                                                                        >
                                                                                                            Lanjutkan
                                                                                                        </Button>
                                                                                                    </>
                                                                                                );
                                                                                            })()}
                                                                                        </div>
                                                                                    </div>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex justify-end">
                                                                        <Button
                                                                            onClick={() => {
                                                                                if (
                                                                                    !auth.user
                                                                                ) {
                                                                                    router.get(
                                                                                        "/login"
                                                                                    );
                                                                                } else {
                                                                                    setSelectedTicket(
                                                                                        category.id
                                                                                    );
                                                                                }
                                                                            }}
                                                                            disabled={
                                                                                category.available_seats ===
                                                                                0
                                                                            }
                                                                            className={`${
                                                                                category.available_seats ===
                                                                                0
                                                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                                                            }`}
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
                <Dialog
                    open={showSuccessDialog}
                    onOpenChange={setShowSuccessDialog}
                >
                    <DialogContent className="max-w-sm rounded-xl shadow-xl text-center">
                        <div className="flex justify-center mb-2">
                            <div className="bg-blue-200 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold">
                                Pesanan Berhasil
                            </DialogTitle>

                            <DialogDescription className="text-gray-600">
                                Selamat! Pesanan kamu telah berhasil diproses.
                            </DialogDescription>
                        </div>
                        <button
                            onClick={() => {
                                setShowSuccessDialog(false);
                                router.get("/tickets");
                            }}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition font-semibold"
                        >
                            Ok
                        </button>
                    </DialogContent>
                </Dialog>
            </CustomerLayout>
        </>
    );
}
