import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

type Report = {
    id: number;
    user: string;
    message: string;
    date: string;
};

const mockReports: Report[] = [
    {
        id: 1,
        user: "Budi",
        message: "Saya tidak bisa melihat tiket setelah pembayaran.",
        date: "2025-04-21",
    },
    {
        id: 2,
        user: "Siti",
        message: "Acara dibatalkan tapi belum ada refund.",
        date: "2025-04-20",
    },
    {
        id: 3,
        user: "John",
        message: "Ada kesalahan pada jadwal event yang ditampilkan.",
        date: "2025-04-19",
    },
];

export default function Laporan() {
    const [reports, setReports] = useState<Report[]>(mockReports);

    const handleMarkResolved = (id: number) => {
        setReports((prev) => prev.filter((r) => r.id !== id));
        alert("Laporan ditandai selesai.");
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Laporan & Komplain</h1>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {report.date}
                                    </p>
                                    <h2 className="font-semibold text-lg">
                                        {report.user}
                                    </h2>
                                    <p className="text-gray-700 line-clamp-2">
                                        {report.message}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                Lihat Detail
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Detail Laporan
                                                </DialogTitle>
                                            </DialogHeader>
                                            <p>
                                                <strong>Dari:</strong>{" "}
                                                {report.user}
                                            </p>
                                            <p>
                                                <strong>Tanggal:</strong>{" "}
                                                {report.date}
                                            </p>
                                            <p className="mt-2">
                                                {report.message}
                                            </p>
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        className="bg-green-600 text-white hover:bg-green-700"
                                        onClick={() =>
                                            handleMarkResolved(report.id)
                                        }
                                    >
                                        Tandai Selesai
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {reports.length === 0 && (
                        <p className="text-gray-500 italic">
                            Tidak ada laporan baru.
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
