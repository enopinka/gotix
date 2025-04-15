import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import ManagementLayout from "@/Layouts/ManagementLayout";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
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
                                <TableHead className="">Nama Acara</TableHead>
                                <TableHead className="">Deskripsi</TableHead>
                                <TableHead>Apalah</TableHead>
                                <TableHead className="text-right">
                                    Buat hapus
                                </TableHead>
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
                                            {event.description}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/partner/event/${event.id}`}
                                                className="hover:underline"
                                            >
                                                Detail Acara
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button>
                                                <Trash2></Trash2>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                    // <div key={event.id}>
                                    //     <h3>{event.title}</h3>
                                    //     <p>{event.description}</p>
                                    // </div>
                                ))
                            ) : (
                                <p>Tidak ada acara ditemukan.</p>
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
