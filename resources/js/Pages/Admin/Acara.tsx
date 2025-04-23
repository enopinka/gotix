import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";

type EventType = {
    id: number;
    name: string;
    thumbnail: string;
    description: string;
};

const mockEvents: EventType[] = [
    { id: 1, name: "Konser Dewa", thumbnail: "/path/to/thumbnail1.jpg", description: "Konser musik terbesar..." },
    { id: 2, name: "Stand Up Night", thumbnail: "/path/to/thumbnail2.jpg", description: "Malam penuh tawa..." },
    { id: 3, name: "Jazz Fest", thumbnail: "/path/to/thumbnail3.jpg", description: "Festival musik jazz..." },
];

export default function Acara() {
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

    const handleEventClick = (event: EventType) => {
        setSelectedEvent(event);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Acara</h1>

                {/* Daftar Acara */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mockEvents.map((event) => (
                        <div
                            key={event.id}
                            className="border rounded-xl p-4 shadow-lg cursor-pointer hover:scale-105 transform transition"
                            onClick={() => handleEventClick(event)} // Klik acara untuk melihat detail
                        >
                            <img
                                src={event.thumbnail}
                                alt={event.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-semibold text-lg text-center">{event.name}</h3>
                            <p className="text-sm text-center text-gray-500 truncate" style={{ maxWidth: '100%' }}>
                                {event.description}
                            </p> {/* Deskripsi Singkat */}
                        </div>
                    ))}
                </div>

                {/* Dialog atau Modal untuk Menampilkan Detail Acara yang Dipilih */}
                {selectedEvent && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl p-6 w-1/2">
                            <h2 className="text-2xl font-bold mb-4">{selectedEvent.name}</h2>
                            <img
                                src={selectedEvent.thumbnail}
                                alt={selectedEvent.name}
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <p>{selectedEvent.description}</p>
                            <Button
                                className="mt-4"
                                variant="outline"
                                onClick={() => setSelectedEvent(null)} // Tutup detail acara
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
