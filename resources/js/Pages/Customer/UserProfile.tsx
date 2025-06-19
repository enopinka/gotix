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
import {
    Camera,
    Loader2,
    User,
    Mail,
    Lock,
    Edit3,
    Shield,
    Save,
    X,
    Upload,
} from "lucide-react";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

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

const formPasswordSchema = z
    .object({
        current_password: z.string().min(1, "Password saat ini harus diisi"),
        password: z.string().min(8, "Password minimal 8 karakter"),
        password_confirmation: z
            .string()
            .min(8, "Konfirmasi password minimal 8 karakter"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password tidak cocok",
        path: ["password_confirmation"],
    });

export default function UserProfile({ user }: userProfileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
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
        setIsUpdatingProfile(true);
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
                setIsUpdatingProfile(false);
            },
            onError: (e) => {
                console.log(e);
                setIsUpdatingProfile(false);
            },
        });
    }

    function onSubmitPassword(values: z.infer<typeof formPasswordSchema>) {
        setIsUpdatingPassword(true);
        console.log(values);
        router.put("/profile/password", values, {
            onSuccess: () => {
                console.log("berhasil ubah password");
                setIsUpdatingPassword(false);
                formPassword.reset();
            },
            onError: (e) => {
                console.log(e);
                setIsUpdatingPassword(false);
            },
        });
    }

    const handlePhotoUpload = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = () => {
        setPreviewUrl(null);
        formProfile.setValue("photo", null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <CustomerLayout>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-2xl py-12 px-8 border border-gray-700/50 shadow-xl"
                    >
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Profil Saya
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Kelola informasi pribadi dan keamanan akun Anda
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {/* Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
                        >
                            {/* Background decorations */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />

                            <div className="relative z-10 p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                                        <User className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            Informasi Profil
                                        </h2>
                                        <p className="text-gray-400">
                                            Update informasi pribadi Anda
                                        </p>
                                    </div>
                                </div>

                                <Form {...formProfile}>
                                    <form
                                        onSubmit={formProfile.handleSubmit(
                                            onSubmitProfile
                                        )}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* Photo Upload Section */}
                                            <div className="flex flex-col items-center lg:items-start">
                                                <FormField
                                                    control={
                                                        formProfile.control
                                                    }
                                                    name="photo"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col items-center">
                                                            <div className="relative group">
                                                                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-gray-600/50 group-hover:border-blue-500/50 transition-all duration-300">
                                                                    {previewUrl ? (
                                                                        <img
                                                                            src={
                                                                                previewUrl
                                                                            }
                                                                            alt="Profile Preview"
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center">
                                                                            <User className="w-16 h-16 text-gray-400" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition-all duration-300">
                                                                    <Camera className="w-8 h-8 text-white" />
                                                                </div>
                                                            </div>

                                                            <FormControl>
                                                                <input
                                                                    ref={
                                                                        fileInputRef
                                                                    }
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const file =
                                                                            e
                                                                                .target
                                                                                .files?.[0];
                                                                        if (
                                                                            file
                                                                        ) {
                                                                            setPreviewUrl(
                                                                                URL.createObjectURL(
                                                                                    file
                                                                                )
                                                                            );
                                                                            field.onChange(
                                                                                file
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>

                                                            <div className="flex gap-2 mt-4">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={
                                                                        handlePhotoUpload
                                                                    }
                                                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 font-medium"
                                                                >
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    Upload
                                                                </Button>
                                                                {previewUrl && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={
                                                                            handleRemovePhoto
                                                                        }
                                                                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                                                                    >
                                                                        <X className="w-4 h-4 mr-2" />
                                                                        Hapus
                                                                    </Button>
                                                                )}
                                                            </div>
                                                            <FormMessage className="text-red-400 mt-2 text-center" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Form Fields */}
                                            <div className="flex-1 space-y-6">
                                                <FormField
                                                    control={
                                                        formProfile.control
                                                    }
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                                                                <User className="w-4 h-4 text-blue-400" />
                                                                Nama Pengguna
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                                                    placeholder="Masukkan nama Anda"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={
                                                        formProfile.control
                                                    }
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                                                                <Mail className="w-4 h-4 text-blue-400" />
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="email"
                                                                    className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                                                    placeholder="Masukkan email Anda"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="submit"
                                                    disabled={isUpdatingProfile}
                                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                                                >
                                                    {isUpdatingProfile ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Menyimpan...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-4 h-4 mr-2" />
                                                            Simpan Profil
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </motion.div>

                        {/* Password Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
                        >
                            {/* Background decorations */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/10 to-orange-500/10 rounded-full blur-3xl translate-y-16 -translate-x-16" />

                            <div className="relative z-10 p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                                        <Shield className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            Keamanan Akun
                                        </h2>
                                        <p className="text-gray-400">
                                            Update password untuk menjaga
                                            keamanan akun
                                        </p>
                                    </div>
                                </div>

                                <Form {...formPassword}>
                                    <form
                                        onSubmit={formPassword.handleSubmit(
                                            onSubmitPassword
                                        )}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={formPassword.control}
                                            name="current_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                                                        <Lock className="w-4 h-4 text-red-400" />
                                                        Password Saat Ini
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="password"
                                                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 rounded-xl"
                                                            placeholder="Masukkan password saat ini"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={formPassword.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                                                        <Lock className="w-4 h-4 text-red-400" />
                                                        Password Baru
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="password"
                                                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 rounded-xl"
                                                            placeholder="Masukkan password baru (minimal 8 karakter)"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={formPassword.control}
                                            name="password_confirmation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                                                        <Lock className="w-4 h-4 text-red-400" />
                                                        Konfirmasi Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="password"
                                                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 rounded-xl"
                                                            placeholder="Konfirmasi password baru"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            disabled={isUpdatingPassword}
                                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50"
                                        >
                                            {isUpdatingPassword ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Mengubah Password...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="w-4 h-4 mr-2" />
                                                    Ubah Password
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </CustomerLayout>
        </div>
    );
}
