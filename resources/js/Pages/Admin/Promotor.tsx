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
    {
        id: 1,
        name: "EventPro ID",
        profilePicture: "/path/to/promotor1.jpg",
        description: "Spesialis konser dan acara hiburan skala besar.",
        events: [
            { name: "Konser Dewa", thumbnail: "/path/to/thumbnail1.jpg" },
            { name: "Stand Up Night", thumbnail: "/path/to/thumbnail2.jpg" },
            { name: "Jazz Fest", thumbnail: "/path/to/thumbnail3.jpg" },
        ],
    },
    {
        id: 2,
        name: "GoEvent",
        profilePicture: "/path/to/promotor2.jpg",
        description: "Mitra event organizer untuk acara komunitas dan startup.",
        events: [
            { name: "Anime Expo", thumbnail: "/path/to/thumbnail4.jpg" },
            { name: "Startup Weekend", thumbnail: "/path/to/thumbnail5.jpg" },
            { name: "Food Festival", thumbnail: "/path/to/thumbnail6.jpg" },
        ],
    },
    {
        id: 3,
        name: "Lokalize",
        profilePicture: "/path/to/promotor3.jpg",
        description: "Mendukung karya lokal dengan acara tematik dan kreatif.",
        events: [
            { name: "Karya Anak Bangsa", thumbnail: "/path/to/thumbnail7.jpg" },
            { name: "Culinary Night", thumbnail: "/path/to/thumbnail8.jpg" },
        ],
    },
];

export default function Promotor() {
    const handleEventClick = (eventName) => {
        alert(`Kamu mengklik event: ${eventName}`);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Promotor</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPromotors.map((promotor) => (
                        <Dialog key={promotor.id}>
                            <DialogTrigger asChild>
                                <div className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={promotor.profilePicture}
                                            alt={promotor.name}
                                            className="w-16 h-16 object-cover rounded-full border"
                                        />
                                        <div>
                                            <h2 className="font-semibold text-lg">{promotor.name}</h2>
                                            <p className="text-sm text-gray-600">{promotor.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Event oleh {promotor.name}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                    {promotor.events.map((event, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                                            onClick={() => handleEventClick(event.name)}
                                        >
                                            <img
                                                src={event.thumbnail}
                                                alt={event.name}
                                                className="w-16 h-16 rounded object-cover"
                                            />
                                            <p className="text-gray-800 font-medium">{event.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
