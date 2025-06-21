import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircle, X } from "lucide-react";

const formSchema = z.object({
    email: z.string().min(2, { message: "harus berisi setidaknya 2 karakter" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export default function Login() {
    const { errors } = usePage().props;
    const [showAlert, setShowAlert] = useState(!!errors?.password);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        router.post("/login", values, {
            onSuccess: () => {
                console.log("berhasil login");
                setIsLoading(false);
            },
            onError: (e) => {
                setIsLoading(false);
                form.setError("email", { type: "manual", message: e.email });
                form.setError("password", {
                    type: "manual",
                    message: e.password,
                });
            },
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Alert */}
            {showAlert && errors?.password && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-2xl w-full z-50">
                    <Alert
                        variant="destructive"
                        className="flex justify-between items-center bg-red-900/80 backdrop-blur-xl border-red-700/50"
                    >
                        <div className="flex gap-4 items-center">
                            <AlertCircle className="h-4 w-4" />
                            <div>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {errors.password}
                                </AlertDescription>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowAlert(false)}
                                className="text-red-300 hover:text-red-100 transition-colors"
                            >
                                <X />
                            </button>
                        </div>
                    </Alert>
                </div>
            )}

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen p-4 z-10">
                <div className="w-full max-w-md">
                    <Card className="bg-gray-800/80 backdrop-blur-xl border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader className="text-center pb-6 bg-gradient-to-b from-gray-800/50 to-transparent">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Selamat Datang Kembali!
                                </span>
                            </CardTitle>
                            <p className="text-gray-300 text-sm mt-2">
                                Masuk ke akun Anda untuk melanjutkan
                            </p>
                        </CardHeader>

                        <CardContent className="p-6">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-5"
                                >
                                    {/* Email Field */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <svg
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email (contoh: kipli@gmail.com)"
                                                            className="pl-11 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg h-12 transition-all duration-200"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-400 text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <svg
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                            />
                                                        </svg>
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            placeholder="Password"
                                                            className="pl-11 pr-11 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg h-12 transition-all duration-200"
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                                                        >
                                                            {showPassword ? (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8 8m1.878 1.878l4.242 4.242M19.878 9.878l-6 6"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-400 text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Memproses...
                                                </div>
                                            ) : (
                                                "Masuk"
                                            )}
                                        </Button>
                                    </div>

                                    {/* Register Link */}
                                    <div className="text-center pt-4 border-t border-gray-700/50">
                                        <p className="text-gray-300 text-sm">
                                            Pengguna baru?{" "}
                                            <Link
                                                href="/register"
                                                className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover:from-purple-300 hover:to-blue-300 font-semibold transition-all duration-200 hover:underline"
                                            >
                                                Daftar di sini
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
