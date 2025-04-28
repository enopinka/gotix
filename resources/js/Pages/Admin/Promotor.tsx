import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Event {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    user_id: number;
    poster: string;
    seating_chart: string;
}

interface Promotor {
    id: number;
    name: string;
    description?: string;
    profile_picture?: string;
    events: Event[];
}

interface PageProps extends InertiaPageProps {
    promotors: Promotor[];
}

export default function Promotor() {
    const { promotors } = usePage<PageProps>().props;
    const [selectedPromotorId, setSelectedPromotorId] = useState<number | null>(null);

    const handlePromotorClick = (id: number) => {
        setSelectedPromotorId(id === selectedPromotorId ? null : id); // toggle
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Promotor</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotors.map((promotor) => (
                        <div key={promotor.id} className="relative border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition cursor-pointer overflow-visible">
                            <div onClick={() => handlePromotorClick(promotor.id)} className="flex items-center gap-4">
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

                            {/* Dropdown animasi */}
                            <AnimatePresence>
                                {selectedPromotorId === promotor.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        exit={{ opacity: 0, scaleY: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ transformOrigin: "top" }}
                                        className="absolute left-0 right-0 mt-4 bg-white border rounded-lg shadow-xl p-4 z-10 max-h-96 overflow-y-auto"
                                    >
                                        {promotor.events.length > 0 ? (
                                            promotor.events.map((event) => (
                                                <div key={event.id} className="p-3 border-b last:border-0">
                                                    <h3 className="text-md font-semibold">{event.title}</h3>
                                                    <p className="text-sm text-gray-700">{event.description}</p>
                                                    <p className="text-xs text-gray-500 mt-1">📅 {event.date} 🕒 {event.time}</p>
                                                    <p className="text-xs text-gray-500">📍 {event.place}</p>
                                                    {event.poster && (
                                                        <img
                                                            src={event.poster}
                                                            alt={event.title}
                                                            className="mt-2 w-full h-32 object-cover rounded"
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center">Tidak ada event</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
