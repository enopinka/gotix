import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    Plus,
    Trash2,
    Edit2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import React, { useState } from "react";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    price: z.preprocess((val) => Number(val), z.number()),
    quota: z.preprocess((val) => Number(val), z.number()),
});

type Category = {
    id: number;
    type: string;
    price: number;
    quota: number;
    available_seats: number;
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

type EventDetailProps = {
    event: Event;
    categories: Category[];
};

export default function EventDetail({ event, categories }: EventDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: 0,
            quota: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEditing && selectedCategory) {
            router.put(
                `/partner/event/detail/${event.id}/category/${selectedCategory.id}`,
                values,
                {
                    onSuccess: () => {
                        setIsDialogOpen(false);
                        setIsEditing(false);
                        setSelectedCategory(null);
                    },
                }
            );
        } else {
            router.post(`/partner/event/${event.id}/category`, values, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                },
            });
        }
        setIsDialogOpen(false);
        form.reset({
            title: "",
            price: 0,
            quota: 0,
        });
    }

    const eventWithDate = {
        ...event,
        date: new Date(`${event.date}T${event.time}`),
    };

    return (
        <PartnerLayout>
            <div className="max-w-5xl mx-auto py-8 space-y-8">
                {/* Header Event */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {event.title}
                        </h2>
                        <div className="flex items-center gap-3 text-gray-600">
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
                        <div className="flex items-center gap-3 text-gray-600">
                            <ClockIcon className="w-5 h-5" />
                            <span>
                                {eventWithDate.date.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Asia/Jakarta",
                                })} WIB
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPinIcon className="w-5 h-5" />
                            <span>{event.place}</span>
                        </div>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-xl shadow flex items-center gap-2">
                                <Plus className="mr-2 h-4 w-4" />
                                {isEditing ? "Edit Kategori" : "Tambah Kategori Baru"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {isEditing ? "Edit Kategori Tiket" : "Tambah Kategori Tiket"}
                                </DialogTitle>
                                <DialogDescription>
                                    {isEditing
                                        ? "Perbarui data kategori tiket di bawah ini."
                                        : "Isi data kategori tiket baru untuk event ini."}
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Kategori</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Contoh: VIP, Reguler"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Harga</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        placeholder="Harga tiket"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="quota"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kuota</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        placeholder="Jumlah kuota"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 rounded-xl shadow"
                                    >
                                        {isEditing ? "Simpan Perubahan" : "Tambah Kategori"}
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Poster & Seating Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
                        <p className="font-bold mb-2 text-blue-600">Poster Event</p>
                        <img
                            src={event.poster}
                            alt={event.title}
                            className="w-full h-64 object-cover rounded-xl shadow"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
                        <p className="font-bold mb-2 text-cyan-600">Seating Chart</p>
                        <img
                            src={event.seating_chart}
                            alt={event.title}
                            className="w-full h-64 object-cover rounded-xl shadow"
                        />
                    </div>
                </div>

                {/* Table Kategori */}
                <div className="bg-white rounded-2xl shadow p-6 mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Kategori Tiket</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Kuota Total</TableHead>
                                <TableHead>Kuota Tersedia</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">
                                            {category.type}
                                        </TableCell>
                                        <TableCell>
                                            Rp {category.price.toLocaleString("id-ID")}
                                        </TableCell>
                                        <TableCell>{category.quota}</TableCell>
                                        <TableCell>
                                            {category.available_seats}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setSelectedCategory(category);
                                                        form.setValue("title", category.type);
                                                        form.setValue("price", category.price);
                                                        form.setValue("quota", category.quota);
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    <Edit2 className="w-4 h-4" /> Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-500 text-red-600 hover:bg-red-50 flex items-center gap-1"
                                                    onClick={() =>
                                                        router.delete(
                                                            `/partner/event/detail/${event.id}/category/${category.id}`
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4" /> Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-gray-500 py-8"
                                    >
                                        Tidak ada kategori ditemukan.
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