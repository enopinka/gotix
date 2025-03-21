import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link } from "@inertiajs/react";
import { Search, SearchIcon } from "lucide-react";

export default function CustomerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="bg-slate-500 text-white py-4 px-8 mb-4 flex justify-between">
                <div className="flex flex-col items-center text-center">
                    <p className="font-extrabold text-2xl text-center">
                        G O T I X
                    </p>
                    <p className="font-light text-sm text-center">
                        Get Your Online Ticket
                    </p>
                </div>
                <div className="flex gap-4 w-1/2 justify-end">
                    <div className="flex w-1/2">
                        <Input type="text" placeholder="Cari Acara"></Input>
                        <Button>
                            <SearchIcon />
                        </Button>
                    </div>
                    <div>
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </>
    );
}
