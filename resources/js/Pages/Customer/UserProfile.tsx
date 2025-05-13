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
import CustomerLayout from "@/Layouts/CustomerLayout";
import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { on } from "events";

type userProfile = {
    id: number;
    name: string;
    email: string;
    photo: string;
};

type userProfileProps = {
    user: userProfile;
};

const formProfileSchema = z.object({
    name: z.string().min(2, {
        message: "Nama harus minimal 2 karakter.",
    }),
    email: z.string().email({
        message: "Gunakan email yang valid.",
    }),
    photo: z
        .any()
        .refine(
            (file) =>
                file instanceof File ||
                typeof file === "string" ||
                file === null,
            {
                message: "Foto tidak valid",
            }
        ),
});

const formPasswordSchema = z.object({
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
});

export default function UserProfile({ user }: userProfileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        () => (user && user.photo) || null
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            formProfile.setValue("photo", file);
        }
    };

    // 1. Define your form.
    const formProfile = useForm<z.infer<typeof formProfileSchema>>({
        resolver: zodResolver(formProfileSchema),
        defaultValues: {
            name: user.name ? user.name : "",
            email: user.email ? user.email : "",
            photo: user.photo ? user.photo : null,
        },
    });

    const formPassword = useForm<z.infer<typeof formPasswordSchema>>({
        resolver: zodResolver(formPasswordSchema),
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmitProfile(values: z.infer<typeof formProfileSchema>) {
        console.log(values);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (values.photo instanceof File) {
            formData.append("photo", values.photo);
        }

        router.post("/profile/update", formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log("berhasil update");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }

    function onSubmitPassword(values: z.infer<typeof formPasswordSchema>) {
        console.log(values);
        router.put("/profile/password", values, {
            onSuccess: () => console.log("berhasil ubah password"),
            onError: (e) => {
                console.log(e);
            },
        });
    }

    return (
        <>
            <CustomerLayout>
                <div className="max-w-xl mx-auto rounded-lg p-8 bg-white shadow-md">
                    {/* edit profile */}
                    <div>
                        <Form {...formProfile}>
                            <form
                                onSubmit={formProfile.handleSubmit(
                                    onSubmitProfile
                                )}
                                className="flex gap-4 items-start"
                            >
                                <div className="">
                                    <FormField
                                        control={formProfile.control}
                                        name="photo"
                                        render={({ field }) => (
                                            <FormItem>
                                                {previewUrl && (
                                                    <img
                                                        src={
                                                            previewUrl ||
                                                            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                                                        }
                                                        alt="Preview"
                                                        className="w-24 h-24 rounded-full object-cover mb-2"
                                                    />
                                                )}

                                                <FormLabel>
                                                    Upload Foto
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                setPreviewUrl(
                                                                    URL.createObjectURL(
                                                                        file
                                                                    )
                                                                ); // tampilkan preview
                                                                field.onChange(
                                                                    file
                                                                ); // simpan ke react-hook-form
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                {previewUrl && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="text-red-500 mt-2"
                                                        onClick={() => {
                                                            setPreviewUrl(null);
                                                            formProfile.setValue(
                                                                "photo",
                                                                null
                                                            );
                                                        }}
                                                    >
                                                        Hapus Foto
                                                    </Button>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-4 w-full ">
                                    <FormField
                                        control={formProfile.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nama Pengguna
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formProfile.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    {/* ubah password */}
                    <div className="w-full mt-16">
                        <p className="text-lg font-bold">Ubah Password</p>
                        <Form {...formPassword}>
                            <form
                                onSubmit={formPassword.handleSubmit(
                                    onSubmitPassword
                                )}
                                className="space-y-8"
                            >
                                <div>
                                    <FormField
                                        control={formPassword.control}
                                        name="current_password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password Saat Ini
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formPassword.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formPassword.control}
                                        name="password_confirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Konfirmasi Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
