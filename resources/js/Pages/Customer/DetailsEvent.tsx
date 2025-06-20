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
import { motion } from "framer-motion";

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

    const handleCheckout = async (ticketId: number, quantity: number) => {
        if (!auth.user) {
            return router.get("/login");
        }

        try {
            router.post(
                "/orders",
                {
                    ticket_id: ticketId,
                    quantity: quantity,
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
        } catch (error: any) {
            console.error("DETAIL ERROR:", error);
            alert("Terjadi kesalahan saat mengirim data: " + error.message);
        }
    };

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <CustomerLayout>
                <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Event Poster/Banner */}
                        <motion.div
                            className="w-full lg:w-96 flex-shrink-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {event.seating_chart ? (
                                <ReactCardFlip
                                    isFlipped={isFlipped}
                                    flipDirection="horizontal"
                                >
                                    <div
                                        key="front"
                                        onClick={handleClick}
                                        className="aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl group shadow-2xl border border-gray-700/50"
                                    >
                                        <img
                                            src={event.poster}
                                            alt={event.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div
                                        key="back"
                                        onClick={handleClick}
                                        className="aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl group shadow-2xl border border-gray-700/50"
                                    >
                                        <img
                                            src={event.seating_chart}
                                            alt={`${event.title} Seating Chart`}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </ReactCardFlip>
                            ) : (
                                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl group shadow-2xl border border-gray-700/50">
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            )}
                            {event.seating_chart && (
                                <p className="text-center text-sm text-gray-400 mt-3">
                                    Klik poster untuk melihat denah tempat duduk
                                </p>
                            )}
                        </motion.div>

                        {/* Event Info & Tickets */}
                        <motion.div
                            className="flex-1 space-y-6"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Event Info Card */}
                            <Card className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 border-gray-700/50 shadow-xl rounded-2xl">
                                <CardContent className="p-8 space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            {event.title}
                                        </h1>
                                        <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            AVAILABLE NOW
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl border border-gray-700/30">
                                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                                <CalendarIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                    Tanggal
                                                </p>
                                                <p className="text-white font-semibold">
                                                    {eventWithDate.date.toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl border border-gray-700/30">
                                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                                <ClockIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                    Waktu
                                                </p>
                                                <p className="text-white font-semibold">
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
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl border border-gray-700/30">
                                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                                <MapPinIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                    Lokasi
                                                </p>
                                                <p className="text-white font-semibold">
                                                    {event.place}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                                        <p className="text-gray-300">
                                            Diselenggarakan oleh{" "}
                                            <span className="font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                                {event.partner_name}
                                            </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tabs Section */}
                            <Card className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 border-gray-700/50 shadow-xl rounded-2xl">
                                <CardContent className="p-8">
                                    <Tabs
                                        defaultValue="ticket"
                                        className="w-full"
                                    >
                                        <TabsList className="w-full mb-6 bg-black/40 border border-gray-700/50 rounded-xl p-1">
                                            <TabsTrigger
                                                value="desc"
                                                className="w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-gray-300 rounded-lg font-semibold transition-all duration-300"
                                            >
                                                Deskripsi
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="ticket"
                                                className="w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-gray-300 rounded-lg font-semibold transition-all duration-300"
                                            >
                                                Tiket
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="desc"
                                            className="mt-6"
                                        >
                                            <div className="p-6 bg-black/30 rounded-xl border border-gray-700/30">
                                                <p className="text-gray-300 text-justify whitespace-pre-line leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent
                                            value="ticket"
                                            className="mt-6"
                                        >
                                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                                {event.categories?.length >
                                                0 ? (
                                                    event.categories.map(
                                                        (category, index) => (
                                                            <motion.div
                                                                key={
                                                                    category.id
                                                                }
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        index *
                                                                        0.1,
                                                                    duration: 0.5,
                                                                }}
                                                            >
                                                                <Card
                                                                    className={`transition-all duration-300 hover:-translate-y-1 ${
                                                                        category.available_seats ===
                                                                        0
                                                                            ? "bg-gray-800/60 opacity-60 border-gray-700"
                                                                            : selectedTicket ===
                                                                              category.id
                                                                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                                                                            : "bg-gray-800 border-gray-700/50 hover:border-blue-500/30 shadow-lg"
                                                                    }`}
                                                                >
                                                                    <CardContent className="p-6">
                                                                        <div className="flex justify-between items-start mb-4">
                                                                            <div className="flex-1">
                                                                                <h3 className="text-xl font-bold text-white mb-2">
                                                                                    {
                                                                                        category.type
                                                                                    }
                                                                                </h3>
                                                                                <div className="space-y-1">
                                                                                    <p className="text-lg font-semibold text-blue-400">
                                                                                        Rp{" "}
                                                                                        {category.price.toLocaleString(
                                                                                            "id-ID"
                                                                                        )}
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-400">
                                                                                        Tersedia:{" "}
                                                                                        {
                                                                                            category.available_seats
                                                                                        }{" "}
                                                                                        tiket
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <span
                                                                                className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                                                                                    category.available_seats ===
                                                                                    0
                                                                                        ? "bg-gray-600 text-gray-300"
                                                                                        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                                                                                }`}
                                                                            >
                                                                                {category.available_seats ===
                                                                                0
                                                                                    ? "SOLD OUT"
                                                                                    : "AVAILABLE"}
                                                                            </span>
                                                                        </div>

                                                                        {selectedTicket ===
                                                                        category.id ? (
                                                                            <motion.div
                                                                                initial={{
                                                                                    opacity: 0,
                                                                                    height: 0,
                                                                                }}
                                                                                animate={{
                                                                                    opacity: 1,
                                                                                    height: "auto",
                                                                                }}
                                                                                className="space-y-4"
                                                                            >
                                                                                <div className="flex items-center justify-center gap-4 p-4 bg-black/30 rounded-xl">
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
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
                                                                                        className="border-gray-600 text-black hover:bg-gray-700"
                                                                                    >
                                                                                        <Minus className="w-4 h-4" />
                                                                                    </Button>
                                                                                    <span className="text-2xl font-bold text-white min-w-[40px] text-center">
                                                                                        {
                                                                                            quantity
                                                                                        }
                                                                                    </span>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
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
                                                                                        className="border-gray-600 text-black hover:bg-gray-700 disabled:opacity-50"
                                                                                    >
                                                                                        <Plus className="w-4 h-4" />
                                                                                    </Button>
                                                                                </div>

                                                                                <div className="flex gap-3">
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        onClick={() => {
                                                                                            setSelectedTicket(
                                                                                                null
                                                                                            );
                                                                                            setQuantity(
                                                                                                1
                                                                                            );
                                                                                        }}
                                                                                        className="flex-1"
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
                                                                                            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg hover:shadow-cyan-500/25">
                                                                                                Beli
                                                                                                Sekarang
                                                                                            </Button>
                                                                                        </DialogTrigger>
                                                                                        <DialogContent className="max-w-lg bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 border-gray-700/50 rounded-2xl shadow-2xl">
                                                                                            <div className="p-6 space-y-6">
                                                                                                <div>
                                                                                                    <DialogTitle className="text-2xl font-bold text-white mb-2">
                                                                                                        Konfirmasi
                                                                                                        Pemesanan
                                                                                                    </DialogTitle>
                                                                                                    <DialogDescription className="text-gray-400">
                                                                                                        Mohon
                                                                                                        periksa
                                                                                                        kembali
                                                                                                        detail
                                                                                                        pesanan
                                                                                                        Anda
                                                                                                    </DialogDescription>
                                                                                                </div>

                                                                                                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-gray-700/30">
                                                                                                    <img
                                                                                                        src={
                                                                                                            event.poster
                                                                                                        }
                                                                                                        alt={
                                                                                                            event.title
                                                                                                        }
                                                                                                        className="w-16 h-16 rounded-lg object-cover"
                                                                                                    />
                                                                                                    <div className="flex-1">
                                                                                                        <h5 className="text-lg font-semibold text-white">
                                                                                                            {
                                                                                                                event.title
                                                                                                            }
                                                                                                        </h5>
                                                                                                        <p className="text-blue-400">
                                                                                                            {
                                                                                                                category.type
                                                                                                            }
                                                                                                        </p>
                                                                                                        <p className="text-gray-400">
                                                                                                            Jumlah:{" "}
                                                                                                            {
                                                                                                                quantity
                                                                                                            }{" "}
                                                                                                            tiket
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="space-y-3 p-4 bg-black/30 rounded-xl border border-gray-700/30">
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
                                                                                                                <div className="flex justify-between text-gray-300">
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
                                                                                                                <div className="flex justify-between text-gray-300">
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
                                                                                                                <div className="flex justify-between text-gray-300">
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
                                                                                                                <hr className="border-gray-600" />
                                                                                                                <div className="flex justify-between text-xl font-bold text-white">
                                                                                                                    <span>
                                                                                                                        Total
                                                                                                                    </span>
                                                                                                                    <span className="text-blue-400">
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
                                                                                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 shadow-lg hover:shadow-cyan-500/25"
                                                                                                    onClick={async () => {
                                                                                                        await handleCheckout(
                                                                                                            category.id,
                                                                                                            quantity
                                                                                                        );
                                                                                                        setShowDetailDialog(
                                                                                                            false
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    Konfirmasi
                                                                                                    &
                                                                                                    Bayar
                                                                                                </Button>
                                                                                            </div>
                                                                                        </DialogContent>
                                                                                    </Dialog>
                                                                                </div>
                                                                            </motion.div>
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
                                                                                    className={`px-8 py-2.5 font-bold rounded-lg transition-all duration-300 ${
                                                                                        category.available_seats ===
                                                                                        0
                                                                                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                                                                            : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transform"
                                                                                    }`}
                                                                                >
                                                                                    {category.available_seats ===
                                                                                    0
                                                                                        ? "Habis"
                                                                                        : "Pilih Tiket"}
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </CardContent>
                                                                </Card>
                                                            </motion.div>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="text-center py-12">
                                                        <p className="text-gray-400 text-lg">
                                                            Tidak ada kategori
                                                            tiket tersedia.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Success Dialog */}
                <Dialog
                    open={showSuccessDialog}
                    onOpenChange={setShowSuccessDialog}
                >
                    <DialogContent className="max-w-sm bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900 border-gray-700/50 rounded-2xl shadow-2xl text-center">
                        <div className="p-6 space-y-6">
                            <div className="flex justify-center">
                                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-white"
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
                                <DialogTitle className="text-2xl font-bold text-white mb-2">
                                    Pesanan Berhasil!
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Selamat! Pesanan Anda telah berhasil
                                    diproses dan sedang menunggu pembayaran.
                                </DialogDescription>
                            </div>
                            <button
                                onClick={() => setShowSuccessDialog(false)}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                            >
                                Tutup
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CustomerLayout>
        </div>
    );
}
