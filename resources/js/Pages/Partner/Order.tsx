import { Card, CardContent } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PartnerLayout from "@/Layouts/PartnerLayout";

export default function Order() {
    return (
        <PartnerLayout>
            <p className="text-2xl font-bold my-4">Pesanan</p>
            <div>
                <Card>
                    <CardContent className="p-4">
                        <div>
                            <p className="text-lg font-semibold">
                                Hura Hura Bahagia
                            </p>
                            <p className="font-light">
                                27 Januari 2020, 17.30-24.00{" "}
                            </p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">
                                        Nama Pengguna
                                    </TableHead>
                                    <TableHead>Kuantitas</TableHead>
                                    <TableHead>Total Harga</TableHead>
                                    <TableHead className="">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>endang sari</TableCell>
                                    <TableCell>5</TableCell>
                                    <TableCell>10000</TableCell>
                                    <TableCell className="text-right">
                                        <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                            <p>Belum Bayar</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>endang sari</TableCell>
                                    <TableCell>5</TableCell>
                                    <TableCell>10000</TableCell>
                                    <TableCell className="text-right">
                                        <div className="bg-red-600 text-white rounded-md px-2 py-1 w-fit">
                                            <p>Belum Bayar</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </PartnerLayout>
    );
}
