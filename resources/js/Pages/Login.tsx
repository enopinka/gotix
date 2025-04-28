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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post("/login", values, {
            onSuccess: () => {
                console.log("berhasil login");
            },
            onError: (e) => {
                form.setError("email", { type: "manual", message: e.email });
                form.setError("password", {
                    type: "manual",
                    message: e.password,
                });
            },
        });
    }
    return (
        <>
            {showAlert && errors?.password && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-2xl w-full">
                    <Alert
                        variant="destructive"
                        className="flex justify-between items-center"
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
                            >
                                <X />
                            </button>
                        </div>
                    </Alert>
                </div>
            )}
            <div className="flex h-screen">
                
                <div className="w-1/2 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-bold">Welcome Back!</h1>
                </div>

                
                <div className="w-1/2 flex justify-center items-center">
                    <Card className="w-full max-w-md shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold my-4">
                                Login
                            </CardTitle>
                            <CardContent>
                                <p className="text-center text-gray-500 mb-6">
                                    Welcome back! Please login to your account.
                                </p>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="User Name"
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
                                                            type="password"
                                                            placeholder="Password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="remember" className="w-4 h-4" />
                                                <label htmlFor="remember" className="text-gray-600">Remember Me</label>
                                            </div>
                                            <Link href="/forgot-password" className="text-purple-500 hover:underline">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="flex flex-col space-y-4 mt-4">
                                            <Button
                                                type="submit"
                                                className="w-full justify-center px-8"
                                            >
                                                Login
                                            </Button>
                                            <p className="text-center text-gray-600 text-sm">
                                                New User?{" "}
                                                <Link href="/register" className="text-purple-500 hover:underline">
                                                    Signup
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
