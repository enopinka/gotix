import ManagementLayout from "@/Layouts/ManagementLayout";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
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
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@headlessui/react";

const eventFormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
    time: z.string().min(2).max(50),
    place: z.string().min(2).max(50),
    poster: z.any().refine((file) => file instanceof File, {
        message: "File tidak valid",
    }),
    seat: z.any().refine((file) => file instanceof File, {
        message: "File tidak valid",
    }),
});

const categoryFormSchema = z.object({
    title: z.string().min(2).max(50),
    price: z.number().min(1000),
    quota: z.number().min(0),
});

export default function CreateEvent() {
    const eventForm = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            place: "",
            time: "",
        },
    });
    const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            title: "",
            price: 0,
            quota: 0,
        },
    });

    function onSubmit(values: z.infer<typeof eventFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Tambah Acara</p>

                <Form {...eventForm}>
                    <form
                        onSubmit={eventForm.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            {" "}
                            <FormField
                                control={eventForm.control}
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
                                control={eventForm.control}
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
                                control={eventForm.control}
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
                                control={eventForm.control}
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
                                control={eventForm.control}
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
                                control={eventForm.control}
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
                        </div>
                        <div>
                            <div className="flex justify-between my-2 items-center">
                                <p className="font-semibold">Kategori</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <Plus />
                                            Tambah Kategori
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Kategori
                                            </DialogTitle>
                                            <DialogDescription>
                                                Tambah kategori tiket
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Form {...eventForm}>
                                            <form
                                                onSubmit={eventForm.handleSubmit(
                                                    onSubmit
                                                )}
                                                className="space-y-8"
                                            >
                                                <div className="space-y-2">
                                                    {" "}
                                                    <FormField
                                                        control={
                                                            categoryForm.control
                                                        }
                                                        name="title"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Nama
                                                                    kategori
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                    />
                                                                </FormControl>

                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={
                                                            categoryForm.control
                                                        }
                                                        name="title"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Harga
                                                                </FormLabel>
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
                                                        control={
                                                            categoryForm.control
                                                        }
                                                        name="title"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Kuota
                                                                </FormLabel>
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
                                                </div>
                                                <DialogFooter className="sm:justify-end">
                                                    <DialogClose asChild>
                                                        <Button
                                                            type="submit"
                                                            variant="secondary"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <hr />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </PartnerLayout>
        </>
    );
}
