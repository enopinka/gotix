import React, { useState, useRef, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Camera, Loader2, Eye, EyeOff, Save } from "lucide-react";
import { toast } from "react-hot-toast";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    photo?: string | null;
}

interface FlashMessages {
    success?: string;
    error?: string;
    message?: string;
}

// Tipe state untuk visibilitas password
type PasswordVisibility = {
    current: boolean;
    new: boolean;
    confirm: boolean;
};

// Props untuk komponen input yang dapat digunakan kembali
interface LabelInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show?: boolean;
    toggle?: () => void;
}

export default function Profile({
    user,
    flash,
}: {
    user: User;
    flash?: FlashMessages;
}) {
    // Penanganan form untuk berbagai bagian
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        photo: user.photo,
    });
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const photoForm = useForm<{ photo: File | null }>({ photo: null });
    // Refs dan manajemen state
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showPassword, setShowPassword] = useState<PasswordVisibility>({
        current: false,
        new: false,
        confirm: false,
    });

    // Penanganan pesan flash
    useEffect(() => {
        // Menampilkan notifikasi toast berdasarkan pesan flash
        if (flash?.success) toast.success(flash.success);
        if (flash?.message) toast.success(flash.message);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Validasi dan pemrosesan upload foto
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi tipe dan ukuran file
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        const isValidType = allowedTypes.includes(file.type);
        const isValidSize = file.size <= 2 * 1024 * 1024; // Batas 2MB

        if (!isValidType || !isValidSize) {
            toast.error(
                !isValidSize
                    ? "Ukuran gambar harus kurang dari 2MB"
                    : "Tipe file tidak valid"
            );
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        // Membuat preview gambar
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);

        // Upload file
        setIsUploading(true);
        photoForm.setData("photo", file);
        console.log(photoForm);
        photoForm.post("/profile/photo", {
            onSuccess: () => {
                toast.success("Foto profil berhasil diperbarui");
                resetUpload();
            },
            onError: () => {
                toast.error("Upload gagal");
                resetUpload();
            },
            preserveScroll: true,
            forceFormData: true,
        });
        console.log("halo");
    };

    const resetUpload = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setIsUploading(false);
    };

    // Handler pengiriman form generik
    const handleSubmit =
        (
            form: typeof profileForm | typeof passwordForm,
            url: string,
            onSuccessMessage: string
        ) =>
        (e: React.FormEvent) => {
            e.preventDefault();
            form.put(url, {
                onSuccess: () => {
                    toast.success(onSuccessMessage);
                    if (form === passwordForm) form.reset();
                },
                onError: (errors) =>
                    Object.values(errors).forEach((err) =>
                        toast.error(err as string)
                    ),
                preserveScroll: true,
            });
        };

    const togglePassword = (field: keyof PasswordVisibility) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const deletePhoto = () => {
        if (!confirm("Hapus foto profil?")) return;

        photoForm.delete("/profile/photo/delete", {
            onSuccess: () => {
                setPreviewImage(null);
                toast.success("Foto berhasil dihapus");
            },
            onError: () => toast.error("Gagal menghapus foto"),
            preserveScroll: true,
        });
    };

    // Mendapatkan URL foto dengan fallback
    const getPhotoUrl = () =>
        previewImage ||
        (user.photo
            ? `/storage/${user.photo}`
            : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png");

    // Komponen input yang dapat digunakan kembali dengan label
    const LabelInput = ({
        id,
        label,
        type = "text",
        value,
        onChange,
        show,
        toggle,
    }: LabelInputProps) => (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <div className="relative">
                <Input
                    id={id}
                    type={show ? "text" : type}
                    value={value}
                    onChange={onChange}
                    required
                />
                {toggle && (
                    <button
                        type="button"
                        onClick={toggle}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        aria-label={`${
                            show ? "Sembunyikan" : "Tampilkan"
                        } password`}
                    >
                        {show ? (
                            <EyeOff size={16} className="text-gray-400" />
                        ) : (
                            <Eye size={16} className="text-gray-400" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <CustomerLayout>
            <Head title="Profile" />

            <div className="max-w-3xl mx-auto py-6 px-4">
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Bagian Foto dan Informasi Profil */}
                    <div className="p-6 flex flex-col sm:flex-row sm:space-x-6">
                        {/* Form Edit Profil */}
                        <div className="w-full">
                            <h2 className="text-lg font-medium mb-4">
                                Informasi Profil
                            </h2>
                            <form
                                onSubmit={handleSubmit(
                                    profileForm,
                                    "/profile/update",
                                    "Profil berhasil diperbarui"
                                )}
                                className="space-y-4"
                            >
                                <div className="flex gap-8">
                                    {" "}
                                    {/* Bagian Upload Foto */}
                                    <div className="relative mb-4 sm:mb-0">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border">
                                            {isUploading ? (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <Loader2 className="animate-spin text-gray-500" />
                                                </div>
                                            ) : (
                                                <img
                                                    src={getPhotoUrl()}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png";
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="mt-2 flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="px-2 py-1 h-8"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                            >
                                                <Camera
                                                    size={14}
                                                    className="mr-1"
                                                />{" "}
                                                Ubah
                                            </Button>
                                            {user.photo && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="px-2 py-1 h-8 text-red-500"
                                                    onClick={deletePhoto}
                                                >
                                                    Hapus
                                                </Button>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            name="photo"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            aria-label="Upload foto profil"
                                        />
                                    </div>
                                    <div className="w-full space-y-4">
                                        <LabelInput
                                            id="name"
                                            label="Nama"
                                            value={profileForm.data.name}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <LabelInput
                                            id="email"
                                            label="Email"
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            disabled={profileForm.processing}
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            {profileForm.processing ? (
                                                <Loader2
                                                    size={16}
                                                    className="mr-2 animate-spin"
                                                />
                                            ) : (
                                                <Save className="mr-2 w-4 h-4" />
                                            )}
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="my-2" />

                    {/* Bagian Update Password */}
                    <div className="p-6">
                        <h2 className="text-lg font-medium mb-4">
                            Perbarui Password
                        </h2>
                        <form
                            onSubmit={handleSubmit(
                                passwordForm,
                                "/profile/password",
                                "Password berhasil diperbarui"
                            )}
                            className="space-y-4"
                        >
                            <LabelInput
                                id="current_password"
                                label="Password Saat Ini"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "current_password",
                                        e.target.value
                                    )
                                }
                                show={showPassword.current}
                                toggle={() => togglePassword("current")}
                            />
                            <LabelInput
                                id="password"
                                label="Password Baru"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "password",
                                        e.target.value
                                    )
                                }
                                show={showPassword.new}
                                toggle={() => togglePassword("new")}
                            />
                            <LabelInput
                                id="password_confirmation"
                                label="Konfirmasi Password"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                show={showPassword.confirm}
                                toggle={() => togglePassword("confirm")}
                            />
                            <Button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {passwordForm.processing && (
                                    <Loader2
                                        size={16}
                                        className="mr-2 animate-spin"
                                    />
                                )}
                                Perbarui Password
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
