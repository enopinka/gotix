import { useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import {
    Users,
    Calendar,
    MapPin,
    Clock,
    ChevronDown,
    Sparkles,
    TrendingUp,
    Image as ImageIcon,
    User,
} from "lucide-react";

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

const EventCard = ({ event, index }: { event: Event; index: number }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20 hover:bg-gray-700/50 transition-colors duration-200">
            <div className="flex items-start gap-3">
                {event.poster ? (
                    <img
                        src={event.poster}
                        alt={event.title}
                        className="w-12 h-12 object-cover rounded-md border border-gray-600 flex-shrink-0"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center border border-gray-600 flex-shrink-0">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm mb-1 truncate">
                        {event.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                        {event.description}
                    </p>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            <span>{formatDate(event.date)}</span>
                            <Clock className="w-3 h-3 text-emerald-400 ml-1" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <MapPin className="w-3 h-3 text-purple-400" />
                            <span className="truncate">{event.place}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PromotorCard = ({
    promotor,
    isExpanded,
    onToggle,
}: {
    promotor: Promotor;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/30 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            {/* Header Card */}
            <div
                onClick={onToggle}
                className="p-5 cursor-pointer hover:bg-gray-800/70 transition-colors duration-200 rounded-xl"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        {promotor.profile_picture ? (
                            <img
                                src={promotor.profile_picture}
                                alt={promotor.name}
                                className="w-14 h-14 object-cover rounded-full border-2 border-gray-600"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-7 h-7 text-white" />
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                            <span className="text-xs font-semibold text-white">
                                {promotor.events.length}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg text-white mb-1">
                            {promotor.name}
                        </h2>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">
                            {promotor.events.length} Acara
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">Aktif</span>
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="flex items-center justify-center">
                    <div className="bg-gray-700 rounded-lg p-2">
                        <ChevronDown
                            className={`w-4 h-4 text-white transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </div>
            </div>

            {/* Events List */}
            {isExpanded && (
                <div className="px-5 pb-5">
                    <div className="border-t border-gray-700/50 pt-4">
                        <div className="mb-3">
                            <h3 className="text-base font-semibold text-white flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-cyan-400" />
                                Daftar Acara
                            </h3>
                            <p className="text-sm text-gray-400">
                                {promotor.events.length} acara tersedia
                            </p>
                        </div>

                        {promotor.events.length > 0 ? (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {promotor.events.map((event, eventIndex) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        index={eventIndex}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <div className="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                    <Calendar className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Belum ada acara
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Promotor belum membuat acara apapun
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Promotor() {
    const { promotors } = usePage<PageProps>().props;
    const [selectedPromotorId, setSelectedPromotorId] = useState<number | null>(
        null
    );

    const handlePromotorClick = (id: number) => {
        setSelectedPromotorId(id === selectedPromotorId ? null : id);
    };

    const totalPromotors = useMemo(() => promotors.length, [promotors.length]);

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header  */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Daftar Promotor
                        </h1>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            Kelola dan pantau semua promotor GOTIX
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-2">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    Total Promotor
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {totalPromotors}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotor Grid  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {promotors.map((promotor) => (
                        <PromotorCard
                            key={promotor.id}
                            promotor={promotor}
                            isExpanded={selectedPromotorId === promotor.id}
                            onToggle={() => handlePromotorClick(promotor.id)}
                        />
                    ))}
                </div>

                {/* Empty State  */}
                {promotors.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700/50 max-w-md mx-auto">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Belum Ada Promotor
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Belum ada promotor yang terdaftar di sistem
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
