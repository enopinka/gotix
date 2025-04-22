import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

const mockPromotors = [
    { id: 1, name: "EventPro ID", events: ["Konser Dewa", "Stand Up Night", "Jazz Fest"] },
    { id: 2, name: "GoEvent", events: ["Anime Expo", "Startup Weekend", "Food Festival"] },
    { id: 3, name: "Lokalize", events: ["Karya Anak Bangsa", "Culinary Night"] },
];

export default function Promotor() {
    const handleEventClick = (eventName) => {
        alert(`Kamu mengklik event: ${eventName}`);
        // atau bisa diarahkan ke detail page: navigate(`/event/${eventId}`)
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Promotor</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPromotors.map((promotor) => (
                        <Dialog key={promotor.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="border rounded-xl p-4 cursor-pointer shadow-sm hover:bg-gray-50 transition"
                                >
                                    <h2 className="font-semibold text-lg">{promotor.name}</h2>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Event oleh {promotor.name}</DialogTitle>
                                </DialogHeader>
                                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                                    {promotor.events.map((event, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer hover:text-blue-600 transition"
                                            onClick={() => handleEventClick(event)}
                                        >
                                            {event}
                                        </li>
                                    ))}
                                </ul>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
