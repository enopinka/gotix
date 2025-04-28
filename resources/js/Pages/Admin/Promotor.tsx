import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

// Definisi tipe Promotor
interface Promotor {
    id: number;
    name: string;
    description?: string;
    profile_picture?: string;
    events: {
        id: number;
        name: string;
        thumbnail?: string;
    }[];
}

// Extend PageProps
interface PageProps extends InertiaPageProps {
    promotors: Promotor[];
}

export default function Promotor() {
    const { promotors } = usePage<PageProps>().props;

    const handleEventClick = (eventName: string) => {
        alert(`Kamu mengklik event: ${eventName}`);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Promotor</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotors.map((promotor) => (
                        <Dialog key={promotor.id}>
                            <DialogTrigger asChild>
                                <div className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={promotor.profile_picture || "/default-profile.png"}
                                            alt={promotor.name}
                                            className="w-16 h-16 object-cover rounded-full border"
                                        />
                                        <div>
                                            <h2 className="font-semibold text-lg">{promotor.name}</h2>
                                            <p className="text-sm text-gray-600">{promotor.description ?? '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Event oleh {promotor.name}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                    {promotor.events.map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                                            onClick={() => handleEventClick(event.name)}
                                        >
                                            <img
                                                src={event.thumbnail || "/default-event-thumbnail.png"}
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
