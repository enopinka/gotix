import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link, router } from "@inertiajs/react";
import {
    Banknote,
    CalendarIcon,
    Copy,
    LogOut,
    Plus,
    Ticket,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
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
            console.log(values);
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
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Tambah Acara</p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            {" "}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Acara</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="place"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tempat</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
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

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </PartnerLayout>
        </>
    );
}
