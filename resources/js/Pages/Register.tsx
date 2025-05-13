import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, router } from "@inertiajs/react";

const formSchema = z.object({
    email: z.string().min(2, { message: "harus berisi setidaknya 2 karakter" }),
    name: z.string().min(2, { message: "harus berisi setidaknya 2 karakter" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirm_password: z
        .string()
        .min(6, { message: "Password minimal 6 karakter" }),
});

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password === values.confirm_password) {
            router.post("/register", values, {
                onSuccess: () => {
                    console.log("berhasil register");
                },
                onError: (e) => {
                    form.setError("email", {
                        type: "manual",
                        message: e.email,
                    });
                    form.setError("password", {
                        type: "manual",
                        message: e.password,
                    });
                },
            });
        }
    }
    return (
        <>
        <div className="relative h-screen w-screen overflow-hidden">
                {/* Gambar sebagai background */}
        <img
            src="/storage/images/asset/login.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Card di atas gambar */}
        <div className="relative flex items-center justify-center h-full z-10">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center my-4">Register</CardTitle>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nama"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email (ex: kipli@gmail.com)"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Konfirmasi Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                                >
                                    Register
                                </Button>
                                <p className="text-center text-sm">
                                    Sudah Punya akun?{" "}
                                    <Link href="/login" className="text-purple-600 hover:underline">
                                        Login
                                    </Link>
                                </p>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    </div>
        </>
    );
}
