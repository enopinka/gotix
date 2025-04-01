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
import { Link } from "@inertiajs/react";

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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Card className="w-1/2 shadow-md ">
                    <CardHeader>
                        <CardTitle className="text-center my-4">
                            Register
                        </CardTitle>
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
                                            className="w-fit justify-center px-8 mx-auto"
                                        >
                                            Register
                                        </Button>
                                        <p className="text-center">
                                            Sudah Punya akun?{" "}
                                            <span>
                                                <Link href="/login">Login</Link>
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
