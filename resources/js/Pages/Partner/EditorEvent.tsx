import PartnerLayout from "@/Layouts/PartnerLayout";
import { router } from "@inertiajs/react";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Event = {
    id?: number;
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    place?: string;
    poster?: File;
    seat?: File;
    banner?: File;
};

type eventProps = {
    event?: Event;
};

const formSchema = (isEdit: boolean) =>
    z.object({
        title: z.string().min(2),
        description: z.string().min(2),
        date: z.date({ required_error: "Tanggal tidak boleh kosong" }),
        time: z.string().min(2),
        place: z.string().min(2),
        poster: isEdit
            ? z.any().optional()
            : z.any().refine((file) => file instanceof File, {
                  message: "Poster wajib diisi dan harus file yang valid",
              }),
        seat: z.any().optional(),
        banner: z.any().optional(),
    });

export default function EditorEvent({ event }: eventProps) {
    const isEdit = !!event;
    const schema = formSchema(isEdit);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: event?.title ? event.title : "",
            description: event?.description ? event.description : "",
            place: event?.place ? event.place : "",
            time: event?.time ? event.time : "",
            date: event?.date ? new Date(event.date) : undefined,
            poster: event?.poster ? event.poster : undefined,
            seat: event?.seat ? event.seat : undefined,
            banner: event?.banner ? event.banner : undefined,
        },
    });

    function onSubmit(values: z.infer<typeof schema>) {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("date", format(values.date, "yyyy-MM-dd"));
        formData.append("time", values.time);
        formData.append("place", values.place);
        if (values.poster instanceof File)
            formData.append("poster", values.poster);
        if (values.seat instanceof File) formData.append("seat", values.seat);
        if (values.banner instanceof File)
            formData.append("banner", values.banner);

        const formattedValues = {
            ...values,
            date: format(values.date, "yyyy-MM-dd"),
        };
        if (event) {
            router.post(`/partner/event/edit/${event.id}`, formData, {
                forceFormData: true,
                onSuccess: () => console.log("Event berhasil diupdate"),
                onError: (e) => console.error(e),
            });
        } else {
            router.post("/partner/event/create", formattedValues, {
                onSuccess: () => {
                    console.log("berhasil menambahkan event baru");
                },
                onError: () => {
                    console.log("error");
                },
            });
        }
    }

    return (
        <PartnerLayout>
            <div className="flex justify-center py-8">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl px-8 py-10">
                    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                        {isEdit ? "Edit Acara" : "Tambah Acara"}
                    </h1>
                    <p className="text-center text-gray-500 mb-8">
                        {isEdit
                            ? "Perbarui detail acara Anda di bawah ini."
                            : "Lengkapi detail acara untuk membuat event baru."}
                    </p>
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
                                        <FormLabel>Nama Acara</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan nama acara" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Deskripsi acara" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="place"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tempat</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Lokasi acara" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tanggal</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "dd/MM/yyyy"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pilih tanggal
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Waktu</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="poster"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload Poster</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seat"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload Denah</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="banner"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload Banner</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                            >
                                {isEdit ? "Simpan Perubahan" : "Buat Event"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </PartnerLayout>
    );
}