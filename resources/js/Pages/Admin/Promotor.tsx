import { useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, router, Link } from "@inertiajs/react";
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
    Trash2,
    AlertTriangle,
    TriangleAlert,
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
    revenue: number;
}

interface Promotor {
    id: number;
    name: string;
    email: string;
    description?: string;
    profile_picture?: string;
    total_revenue: number;
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
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
                        {event.revenue > 0 && (
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                                <TrendingUp className="w-3 h-3" />
                                <span>{formatCurrency(event.revenue)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    promotorName,
    isLoading,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    promotorName: string;
    isLoading: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                        Konfirmasi Hapus
                    </h3>
                </div>

                <p className="text-gray-300 mb-6">
                    Apakah Anda yakin ingin menghapus promotor{" "}
                    <span className="font-semibold text-white">
                        {promotorName}
                    </span>
                    ?
                    <br />
                    <span className="text-sm text-red-400 mt-2 block">
                        Tindakan ini tidak dapat dibatalkan.
                    </span>
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Menghapus...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Hapus
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PromotorCard = ({
    promotor,
    isExpanded,
    onToggle,
    onDelete,
}: {
    promotor: Promotor;
    isExpanded: boolean;
    onToggle: () => void;
    onDelete: () => void;
}) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/30 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 ">
            {/* Header Card */}
            <div className="p-5">
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
                        <p className="text-sm text-gray-400">
                            {promotor.email}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onToggle}
                            className="bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-colors"
                        >
                            <ChevronDown
                                className={`w-4 h-4 text-white transition-transform duration-200 ${
                                    isExpanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg p-2 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm">Total Acara</span>
                        </div>
                        <p className="text-lg font-semibold text-white">
                            {promotor.events.length}
                        </p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm">Total Revenue</span>
                        </div>
                        <p className="text-lg font-semibold text-emerald-400">
                            {formatCurrency(promotor.total_revenue)}
                        </p>
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
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        promotorId: number | null;
        promotorName: string;
    }>({ isOpen: false, promotorId: null, promotorName: "" });
    const [isDeleting, setIsDeleting] = useState(false);

    const handlePromotorClick = (id: number) => {
        setSelectedPromotorId(id === selectedPromotorId ? null : id);
    };

    const handleDeleteClick = (promotor: Promotor) => {
        setDeleteModal({
            isOpen: true,
            promotorId: promotor.id,
            promotorName: promotor.name,
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.promotorId) return;

        setIsDeleting(true);

        try {
            const response = await fetch(
                `/admin/partner/${deleteModal.promotorId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                // Refresh the page to update the promotor list
                router.reload({ only: ["promotors"] });

                // Show success message (you can customize this)
                alert(data.message);
            } else {
                alert(
                    data.message || "Terjadi kesalahan saat menghapus promotor"
                );
            }
        } catch (error) {
            console.error("Error deleting promotor:", error);
            alert("Terjadi kesalahan saat menghapus promotor");
        } finally {
            setIsDeleting(false);
            setDeleteModal({
                isOpen: false,
                promotorId: null,
                promotorName: "",
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, promotorId: null, promotorName: "" });
    };

    const totalPromotors = useMemo(() => promotors.length, [promotors.length]);
    const totalRevenue = useMemo(
        () =>
            promotors.reduce(
                (sum, promotor) => sum + promotor.total_revenue,
                0
            ),
        [promotors]
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Daftar Promotor
                        </h1>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            Kelola dan pantau semua promotor GOTIX
                        </p>
                        <a
                            href="https://docs.google.com/spreadsheets/d/18hB5yc3ZBreUPxfnN5WjflZtEcjz0OxW4UX8aQMMTIU/edit?resourcekey=&gid=1101009762#gid=1101009762"
                            className="text-sm text-blue-400 hover:underline mt-2 inline-flex items-center gap-2"
                            target="_blank"
                        >
                            <TriangleAlert className="w-4 h-4 text-yellow-400" />
                            Pengajuan Mitra Perlu Tinjauan
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg p-2">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Total Revenue
                                    </p>
                                    <p className="text-xl font-bold text-emerald-400">
                                        {formatCurrency(totalRevenue)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotor Grid */}
                <div className="w-full space-y-4">
                    {promotors.map((promotor) => (
                        <PromotorCard
                            key={promotor.id}
                            promotor={promotor}
                            isExpanded={selectedPromotorId === promotor.id}
                            onToggle={() => handlePromotorClick(promotor.id)}
                            onDelete={() => handleDeleteClick(promotor)}
                        />
                    ))}
                </div>

                {/* Empty State */}
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

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    promotorName={deleteModal.promotorName}
                    isLoading={isDeleting}
                />
            </div>
        </AdminLayout>
    );
}
