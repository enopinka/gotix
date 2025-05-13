import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from '@inertiajs/core';

// Definisi tipe Event
interface Event {
    id: number;
    title: string;
    description: string;
    poster?: string;
    date: string;
    time: string;
    place: string;
}

// Extend PageProps
interface PageProps extends InertiaPageProps {
    events: Event[];
}

export default function Acara() {
    const { events } = usePage<PageProps>().props;
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Acara</h1>

                {/* Daftar Acara */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="border rounded-xl p-4 shadow-lg cursor-pointer hover:scale-105 transform transition"
                            onClick={() => handleEventClick(event)}
                        >
                            <img
                                src={event.poster || "/default-event-thumbnail.png"}
                                alt={event.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-semibold text-lg text-center">{event.title}</h3>
                            <p className="text-sm text-center text-gray-500 truncate" style={{ maxWidth: '100%' }}>
                                {event.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Modal detail acara */}
                {selectedEvent && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                            <img
                                src={selectedEvent.poster || "/default-event-thumbnail.png"}
                                alt={selectedEvent.title}
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <p className="mb-4">{selectedEvent.description}</p>

                            <div className="text-sm text-gray-700 space-y-1">
                                <p><strong>Tempat:</strong> {selectedEvent.place}</p>
                                <p><strong>Tanggal:</strong> {selectedEvent.date}</p>
                                <p><strong>Waktu:</strong> {selectedEvent.time}</p>
                            </div>

                            <Button
                                className="mt-6"
                                variant="outline"
                                onClick={() => setSelectedEvent(null)}
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
