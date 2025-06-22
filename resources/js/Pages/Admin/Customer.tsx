import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { motion } from "framer-motion";
import { Trash2, Mail, Calendar, User } from "lucide-react";
import { useState } from "react";

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
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (customer: Customer) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus pelanggan ${customer.name}?`
        );

        if (confirmation) {
            setIsDeleting(customer.id);

            try {
                // Kirim request DELETE ke backend
                await fetch(`/admin/customer/${customer.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                });

                // Reload halaman untuk memperbarui data
                router.reload();
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Terjadi kesalahan saat menghapus customer!");
            } finally {
                setIsDeleting(null);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 text-white">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Daftar Pelanggan
                        </h1>
                    </div>
                    <p className="text-gray-400">
                        Kelola semua data pelanggan Anda
                    </p>

                    {/* Stats Bar */}
                    <div className="mt-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-300">
                                    Total Pelanggan: {customers.length}
                                </span>
                            </div>
                            <div className="text-sm text-gray-400">
                                Data terupdate secara real-time
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden"
                >
                    {customers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* Table Header */}
                                <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-700/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Terdaftar
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-700/30">
                                    {customers.map((customer, index) => (
                                        <motion.tr
                                            key={customer.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.05,
                                                duration: 0.4,
                                            }}
                                            className={`transition-all duration-300 ${
                                                hoveredRow === customer.id
                                                    ? "bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-blue-500/10 transform scale-[1.01]"
                                                    : "hover:bg-gray-700/20"
                                            } ${
                                                isDeleting === customer.id
                                                    ? "opacity-50"
                                                    : ""
                                            }`}
                                            onMouseEnter={() =>
                                                setHoveredRow(customer.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredRow(null)
                                            }
                                        >
                                            {/* Name */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-white">
                                                    {customer.name}
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Mail className="w-4 h-4 text-blue-400" />
                                                    <span className="text-sm">
                                                        {customer.email}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Created At */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm">
                                                        {new Date(
                                                            customer.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600 text-white hover:from-red-600 hover:to-red-700 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 group"
                                                        onClick={() =>
                                                            handleDelete(
                                                                customer
                                                            )
                                                        }
                                                        disabled={
                                                            isDeleting ===
                                                            customer.id
                                                        }
                                                    >
                                                        <Trash2
                                                            className={`w-4 h-4 mr-2 ${
                                                                isDeleting ===
                                                                customer.id
                                                                    ? "animate-spin"
                                                                    : "group-hover:animate-pulse"
                                                            }`}
                                                        />
                                                        {isDeleting ===
                                                        customer.id
                                                            ? "Menghapus..."
                                                            : "Hapus"}
                                                    </Button>
                                                </motion.div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Belum Ada Pelanggan
                            </h3>
                            <p className="text-gray-400">
                                Data pelanggan akan muncul di sini setelah ada
                                yang mendaftar
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
