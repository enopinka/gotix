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

export default function Profile({
    user,
    flash,
}: {
    user: User;
    flash?: { success?: string; error?: string; message?: string };
}) {
    const profileForm = useForm({ name: user.name, email: user.email });
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const photoForm = useForm<{ photo: File | null }>({ photo: null });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
        current: false,
        new: false,
        confirm: false,
    });

    useEffect(() => {
        flash?.success && toast.success(flash.success);
        flash?.message && toast.success(flash.message);
        flash?.error && toast.error(flash.error);
    }, [flash]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
            toast.error(
                file.size > 2 * 1024 * 1024
                    ? "Image size must be less than 2MB"
                    : "Invalid file type"
            );
            fileInputRef.current && (fileInputRef.current.value = "");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);

        setIsUploading(true);
        photoForm.setData("photo", file);
        photoForm.post("/profile/photo", {
            onSuccess: () => {
                toast.success("Profile photo updated");
                resetUpload();
            },
            onError: () => {
                toast.error("Upload failed");
                resetUpload();
            },
            preserveScroll: true,
        });
    };

    const resetUpload = () => {
        fileInputRef.current && (fileInputRef.current.value = "");
        setIsUploading(false);
    };

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

    const togglePassword = (field: string) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const deletePhoto = () => {
        if (!confirm("Remove profile photo?")) return;
        photoForm.delete("/profile/photo/delete", {
            onSuccess: () => {
                setPreviewImage(null);
                toast.success("Photo removed");
            },
            onError: () => toast.error("Failed to remove photo"),
            preserveScroll: true,
        });
    };

    const getPhotoUrl = () =>
        previewImage ||
        (user.photo
            ? `/storage/${user.photo}`
            : "https://via.placeholder.com/150");

    const LabelInput = ({
        id,
        label,
        type = "text",
        value,
        onChange,
        show,
        toggle,
    }: any) => (
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
                    {/* Profile Section */}
                    <div className="p-6 flex flex-col sm:flex-row sm:space-x-6">
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
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                "https://via.placeholder.com/150")
                                        }
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
                                    <Camera size={14} className="mr-1" /> Change
                                </Button>
                                {user.photo && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="px-2 py-1 h-8 text-red-500"
                                        onClick={deletePhoto}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Profile Form */}
                        <div className="w-full">
                            <h2 className="text-lg font-medium mb-4">
                                Profile Information
                            </h2>
                            <form
                                onSubmit={handleSubmit(
                                    profileForm,
                                    "/profile/update",
                                    "Profile updated"
                                )}
                                className="space-y-4"
                            >
                                <LabelInput
                                    id="name"
                                    label="Name"
                                    value={profileForm.data.name}
                                    onChange={(e: any) =>
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
                                    onChange={(e: any) =>
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
                                    Save Changes
                                </Button>
                            </form>
                        </div>
                    </div>

                    <hr className="my-2" />

                    {/* Password Section */}
                    <div className="p-6">
                        <h2 className="text-lg font-medium mb-4">
                            Update Password
                        </h2>
                        <form
                            onSubmit={handleSubmit(
                                passwordForm,
                                "/profile/password",
                                "Password updated"
                            )}
                            className="space-y-4"
                        >
                            <LabelInput
                                id="current_password"
                                label="Current Password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e: any) =>
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
                                label="New Password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e: any) =>
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
                                label="Confirm Password"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e: any) =>
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
                                Update Password
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
