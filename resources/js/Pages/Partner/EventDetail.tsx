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

import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

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
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "yuhuu",
            price: 10000,
            quota: 50,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        router.post(`/partner/event/${event.id}/category`, values, {
            onSuccess: () => {
                console.log("berhasil menambahkan kategori baru");
            },
        });
    }

    return (
        <>
            <PartnerLayout>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <p>{event.place}</p>
                <p>{formattedDate}</p>
                <p>{event.time}</p>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kategori Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Kategori</DialogTitle>
                            <DialogDescription>Apalah ini</DialogDescription>
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
                                                <Input type="text" {...field} />
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

                <div>
                    <Table>
                        <TableCaption>
                            A list of your recent invoices.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Kuota Total</TableHead>
                                <TableHead>Kuota Tersedia</TableHead>
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
                                    </TableRow>
                                ))
                            ) : (
                                <p>Tidak ada acara ditemukan.</p>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </PartnerLayout>
            ;
        </>
    );
}
