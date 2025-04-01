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
            <div className="flex justify-center items-center h-screen">
                <Card className="w-1/2 shadow-md ">
                    <CardHeader>
                        <CardTitle className="text-center my-4">
                            Login
                        </CardTitle>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email"
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
                                    <div className="flex flex-col space-y-4">
                                        <Button
                                            type="submit"
                                            className="w-fit justify-center px-8 mx-auto"
                                        >
                                            Login
                                        </Button>
                                        <p className="text-center">
                                            Belum Punya akun?{" "}
                                            <span>
                                                <Link href="/register">
                                                    Register
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
}
