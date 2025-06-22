import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

type Event = {
    id: number;
    title: string;
    description: string;
};

type eventProps = {
    events: Event[];
};

export default function Event({ events }: eventProps) {
    return (
        <PartnerLayout>
            <div className="max-w-5xl mx-auto py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        Daftar Acara Anda
                    </h1>
                    <Link href="/partner/event/create">
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Tambah Acara
                        </Button>
                    </Link>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-3/12">Nama Acara</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-2/12">Detail</TableHead>
                                <TableHead className="w-2/12">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events && events.length > 0 ? (
                                events.map((event) => (
                                    <TableRow
                                        key={event.id}
                                        className="hover:bg-blue-50 transition-colors"
                                    >
                                        <TableCell className="font-semibold text-gray-800">
                                            {event.title}
                                        </TableCell>
                                        <TableCell>
                                            <span className="block max-w-xs truncate text-gray-600" title={event.description}>
                                                {event.description}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/partner/event/detail/${event.id}`}
                                                className="text-blue-500 hover:underline font-medium"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                                                    onClick={() =>
                                                        router.get(
                                                            `/partner/event/edit/${event.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-500 text-red-600 hover:bg-red-50"
                                                    onClick={() =>
                                                        router.delete(
                                                            `/partner/event/${event.id}/delete`
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500 py-8"
                                    >
                                        Tidak ada acara ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </PartnerLayout>
    );
}