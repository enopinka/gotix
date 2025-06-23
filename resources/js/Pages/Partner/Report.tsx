import StatCard from "@/Components/StatCard";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Ticket, CircleDollarSign, Banknote, FileText } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";

type ReportProps = {
    ticket_solds: number;
    total_revenue: number;
    unreleased_earnings: number;
};

export default function Report({
    ticket_solds,
    total_revenue,
    unreleased_earnings,
}: ReportProps) {
    const [open, setOpen] = useState(false);

    // Format rupiah
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <PartnerLayout>
            <div className="max-w-5xl mx-auto py-10 space-y-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                    Laporan Keuangan
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<Ticket className="w-8 h-8 text-blue-500" />}
                        title="Tiket Terjual"
                        value={ticket_solds.toString()}
                    />
                    <StatCard
                        icon={<CircleDollarSign className="w-8 h-8 text-green-500" />}
                        title="Pendapatan Total"
                        value={formatCurrency(total_revenue)}
                    />
                    <StatCard
                        icon={<Banknote className="w-8 h-8 text-cyan-500" />}
                        title="Pendapatan Belum Dicairkan"
                        value={formatCurrency(unreleased_earnings)}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <a
                        href="https://forms.gle/x4P6DWbadFXUgvSz6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl py-3 px-6 shadow hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 gap-2"
                    >
                        <Banknote className="w-5 h-5" />
                        Ajukan Pencairan Dana
                    </a>
                    {/* Tombol Detail Pencairan Dana diganti jadi button yang buka dialog */}
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex-1 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl py-3 px-6 shadow hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        Detail Pencairan Dana
                    </button>
                </div>
                {/* Dialog Syarat & Ketentuan */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                Syarat dan Ketentuan Pencairan Dana untuk Partner
                            </DialogTitle>
                            <DialogDescription>
                                <div className="text-left text-gray-700 space-y-4 mt-4 text-sm max-h-[60vh] overflow-y-auto">
                                    <div>
                                        <b>1. Ketentuan Umum</b>
                                        <ul className="list-disc ml-5">
                                            <li>Partner adalah pihak yang telah terdaftar dan terverifikasi dalam platform.</li>
                                            <li>Dana yang dimaksud adalah hasil transaksi penjualan jasa/produk melalui platform.</li>
                                            <li>Pencairan hanya dapat dilakukan oleh akun yang telah diverifikasi identitas dan rekening banknya.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>2. Syarat Pencairan Dana</b>
                                        <ul className="list-disc ml-5">
                                            <li>Dana akan tersedia untuk dicairkan setelah status transaksi selesai .</li>
                                            <li>Minimal nominal pencairan: Rp50.000.</li>
                                            <li>Partner wajib melengkapi informasi berikut:
                                                <ul className="list-disc ml-5">
                                                    <li>Nama pemilik rekening</li>
                                                    <li>Nama bank dan nomor rekening</li>
                                                    <li>KTP atau identitas resmi lainnya</li>
                                                </ul>
                                            </li>
                                            <li>Dana tidak akan dicairkan jika data yang diberikan tidak valid atau mencurigakan.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>3. Jadwal Pencairan</b>
                                        <ul className="list-disc ml-5">
                                            <li>Proses pencairan dilakukan setiap hari kerja (Senin–Jumat, kecuali hari libur nasional).</li>
                                            <li>Estimasi waktu pencairan: 1–3 hari kerja setelah permintaan disetujui.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>4. Biaya Pencairan</b>
                                        <ul className="list-disc ml-5">
                                            <li>Pencairan ke rekening bank tertentu dapat dikenakan biaya administrasi (misalnya, bank non-rekanan).</li>
                                            <li>Biaya akan dipotong langsung dari nominal pencairan.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>5. Penyelesaian Sengketa</b>
                                        <ul className="list-disc ml-5">
                                            <li>Jika terdapat masalah terkait jumlah dana, keterlambatan, atau kesalahan rekening, partner dapat mengajukan komplain melalui pusat bantuan maksimal 7 hari setelah pencairan diajukan.</li>
                                            <li>Platform berhak menahan pencairan jika terdapat indikasi penipuan, sengketa, atau pelanggaran terhadap kebijakan platform.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>6. Pembekuan dan Pemblokiran</b>
                                        <ul className="list-disc ml-5">
                                            <li>Dana partner dapat ditahan sementara atau dibatalkan jika:
                                                <ul className="list-disc ml-5">
                                                    <li>Terjadi pelanggaran terhadap Syarat & Ketentuan Umum platform.</li>
                                                    <li>Terdeteksi aktivitas mencurigakan, seperti duplikasi transaksi, penyalahgunaan sistem, atau laporan pengguna.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>7. Perubahan Ketentuan</b>
                                        <ul className="list-disc ml-5">
                                            <li>Platform berhak mengubah syarat dan ketentuan pencairan dana sewaktu-waktu dengan atau tanpa pemberitahuan sebelumnya.</li>
                                            <li>Partner dianggap menyetujui ketentuan terbaru jika tetap menggunakan layanan pencairan.</li>
                                        </ul>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </PartnerLayout>
    );
}