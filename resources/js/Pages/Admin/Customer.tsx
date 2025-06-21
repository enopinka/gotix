import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

// Bikin Customer type
interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    profile_picture?: string;
}

// Extend PageProps, bukan replace
interface PageProps extends InertiaPageProps {
    customers: Customer[];
}

export default function Customer() {
    const { customers } = usePage<PageProps>().props;

    const handleDelete = (customerName: string) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus pelanggan ${customerName}?`
        );
        if (confirmation) {
            alert(`Pelanggan ${customerName} telah dihapus!`);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Pelanggan</h1>

                <div className="space-y-4">
                    {customers.map((customer) => (
                        <div
                            key={customer.id}
                            className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center justify-between">
                                <div className="mr-4">
                                    <img
                                        src={
                                            customer.profile_picture ||
                                            "/default-profile.png"
                                        }
                                        alt={customer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">
                                        {customer.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Email: {customer.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Telepon: {customer.phone ?? "-"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Terdaftar pada:{" "}
                                        {new Date(
                                            customer.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <Button
                                    variant="outline"
                                    className="hover:bg-red-600 hover:text-white transition"
                                    onClick={() => handleDelete(customer.name)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
