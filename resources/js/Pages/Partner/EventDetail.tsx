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
    FormDescription,
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
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
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
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: 0,
            quota: 0,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEditing && selectedCategory) {
            router.put(
                `/partner/event/detail/${event.id}/category/${selectedCategory.id}`,
                values,
                {
                    onSuccess: () => {
                        console.log("Kategori berhasil diedit");
                        setIsDialogOpen(false);
                        setIsEditing(false);
                        setSelectedCategory(null);
                    },
                }
            );
        } else {
            router.post(`/partner/event/${event.id}/category`, values, {
                onSuccess: () => {
                    console.log("Berhasil menambahkan kategori baru");
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
        <>
            <PartnerLayout>
                <div className="flex justify-between mb-4 ">
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <h2 className="text-xl font-semibold text-accent-foreground">
                            {event.title}
                        </h2>
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
                                        timeZone: "Asia/Jakarta", // sesuaikan zona waktu
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

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Kategori Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Kategori</DialogTitle>
                                <DialogDescription>
                                    Apalah ini
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
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
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-2 w-full">
                    <div className="p-4">
                        <p className="text-center font-bold">Poster</p>
                        <img src={event.poster} alt={event.title} />
                    </div>
                    <div className="p-4">
                        <p className="text-center font-bold">Seating Chart</p>
                        <img src={event.seating_chart} alt={event.title} />
                    </div>
                </div>
                <div>
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
                                        <TableCell>{category.price}</TableCell>
                                        <TableCell>{category.quota}</TableCell>
                                        <TableCell>
                                            {category.available_seats}
                                        </TableCell>
                                        <TableCell>
                                            <span>
                                                <Button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setSelectedCategory(
                                                            category
                                                        );
                                                        form.setValue(
                                                            "title",
                                                            category.type
                                                        );
                                                        form.setValue(
                                                            "price",
                                                            category.price
                                                        );
                                                        form.setValue(
                                                            "quota",
                                                            category.quota
                                                        );
                                                        setIsDialogOpen(true);
                                                    }}
                                                    className="hover:underline hover:bg-transparent bg-transparent border-none text-blue-500 p-2 pl-0"
                                                >
                                                    Edit
                                                </Button>
                                                {""} |{" "}
                                                <Button
                                                    onClick={() =>
                                                        router.delete(
                                                            `/partner/event/detail/${event.id}/category/${category.id}`
                                                        )
                                                    }
                                                    className="hover:underline hover:bg-transparent bg-transparent border-none text-red-500 p-2"
                                                >
                                                    Hapus
                                                </Button>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500"
                                    >
                                        Tidak ada kategori ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </PartnerLayout>
            ;
        </>
    );
}
