import { Button } from "@/Components/ui/button";
import ManagementLayout from "@/Layouts/ManagementLayout";
import PartnerLayout from "@/Layouts/PartnerLayout";
import { Link } from "@inertiajs/react";
import { Banknote, LogOut, Plus, Ticket } from "lucide-react";

export default function Event() {
    return (
        <>
            <PartnerLayout>
                <p className="text-2xl font-bold my-4">Daftar Acara</p>
                <Link href="/partner/event/create">
                    <Button>
                        <Plus /> Tambah Acara
                    </Button>
                </Link>
            </PartnerLayout>
        </>
    );
}
