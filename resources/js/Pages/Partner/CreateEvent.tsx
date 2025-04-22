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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
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

// const categoryFormSchema = z.object({
//     title: z.string().min(2).max(50),
//     price: z.number().min(1000),
//     quota: z.number().min(0),
// });

export default function CreateEvent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "test",
            description: "test",
            place: "test",
            time: "",
        },
    });
    // const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    //     resolver: zodResolver(categoryFormSchema),
    //     defaultValues: {
    //         title: "",
    //         price: 0,
    //         quota: 0,
    //     },
    // });

    // const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formattedValues = {
            ...values,
            date: format(values.date, "yyyy-MM-dd"),
        };
        console.log(values);
        router.post("/partner/event/create", formattedValues, {
            onSuccess: () => {
                console.log("berhasil menambahkan event baru");
            },
            onError: () => {
                console.log("error");
            },
        });
    }
    // function onSubmitCategory(values: z.infer<typeof categoryFormSchema>) {
    //     // Do something with the form values.
    //     // ✅ This will be type-safe and validated.
    //     console.log("yuhu");
    //     console.log(values);
    // }

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
                        </div>
                        {/* <div>
                            <div className="flex justify-between my-2 items-center">
                                <p className="font-semibold">Kategori</p>
                                <Dialog aria-hidden="false">
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
                                                onSubmit={categoryForm.handleSubmit(
                                                    onSubmitCategory
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
                                                                        type="text"
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
                                                        name="price"
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
                                                        name="quota"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Kuota
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="first-dialog-input"
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
                        </div> */}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </PartnerLayout>
        </>
    );
}
