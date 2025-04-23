import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";

const mockCustomers = [
    { id: 1, name: "Budi", email: "budi@example.com", phone: "081234567890", registeredOn: "2023-01-01", profilePicture: "/path/to/profile1.jpg" },
    { id: 2, name: "Siti", email: "siti@example.com", phone: "082345678901", registeredOn: "2023-02-20", profilePicture: "/path/to/profile2.jpg" },
    { id: 3, name: "John Doe", email: "john@example.com", phone: "083456789012", registeredOn: "2023-03-15", profilePicture: "/path/to/profile3.jpg" },
];

export default function Customer() {
    const handleDelete = (customerName: string) => {
        const confirmation = window.confirm(`Apakah Anda yakin ingin menghapus pelanggan ${customerName}?`);
        if (confirmation) {
            alert(`Pelanggan ${customerName} telah dihapus!`);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Pelanggan</h1>

                {/* Daftar Pelanggan */}
                <div className="space-y-4">
                    {mockCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center justify-between">
                                {/* Foto Profil */}
                                <div className="mr-4">
                                    <img
                                        src={customer.profilePicture}
                                        alt={customer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{customer.name}</h2>
                                    <p className="text-sm text-gray-600">Email: {customer.email}</p>
                                    <p className="text-sm text-gray-600">Telepon: {customer.phone}</p>
                                    <p className="text-sm text-gray-500">Terdaftar pada: {customer.registeredOn}</p>
                                </div>

                                {/* Tombol Hapus */}
                                <Button
                                    variant="outline"
                                    className="hover:bg-red-600 hover:text-white transition"
                                    onClick={() => handleDelete(customer.name)} // Fungsi hapus pelanggan
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
