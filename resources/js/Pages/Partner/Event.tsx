import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link, router } from "@inertiajs/react";
import { Banknote, LogOut, Plus, Ticket, Trash, Trash2 } from "lucide-react";

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
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Daftar Acara</p>
                <Link href="/partner/event/create">
                    <Button>
                        <Plus /> Tambah Acara
                    </Button>
                </Link>
                <div>
                    <Table className="my-4 border w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-3/12">
                                    Nama Acara
                                </TableHead>
                                <TableHead className="w-">Deskripsi</TableHead>
                                <TableHead className="w-2/12">Detail</TableHead>
                                <TableHead className="w-2/12">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events && events.length > 0 ? (
                                events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">
                                            {event.title}
                                        </TableCell>
                                        <TableCell>
                                            {event.description.length > 90
                                                ? event.description.slice(
                                                      0,
                                                      90
                                                  ) + "..."
                                                : event.description}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/partner/event/detail/${event.id}`}
                                                className="hover:underline hover:text-blue-500"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <span>
                                                <Button
                                                    onClick={() =>
                                                        router.get(
                                                            `/partner/event/edit/${event.id}`
                                                        )
                                                    }
                                                    className="hover:underline hover:bg-transparent bg-transparent border-none text-blue-500 p-2"
                                                >
                                                    Edit
                                                </Button>
                                                {""} |{" "}
                                                <Button
                                                    onClick={() =>
                                                        router.delete(
                                                            `/partner/event/${event.id}/delete`
                                                        )
                                                    }
                                                    className="hover:underline hover:bg-transparent bg-transparent border-none text-red-500 p-2"
                                                >
                                                    Hapus
                                                </Button>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500"
                                    >
                                        Tidak ada acara ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                        {/* <TableRow>
                                <TableCell className="font-medium">
                                    INV001
                                </TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">
                                    $250.00
                                </TableCell>
                            </TableRow> */}
                    </Table>
                </div>
            </PartnerLayout>
        </>
    );
}
