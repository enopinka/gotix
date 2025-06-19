import { Card, CardContent } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

type Events = {
    id: number;
    title: string;
    poster: string;
    date: string;
    time: string;
    price: string;
    category: string;
    banner: string;
};

type LandingPageProps = {
    events: Events[];
};

export default function LandingPage({ events }: LandingPageProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    const upcomingEvents = events
        .filter((event) => new Date(event.date) >= new Date())
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

    const pastEvents = events
        .filter((event) => new Date(event.date) < new Date())
        .slice(0, 8);

    const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = upcomingEvents.slice(
        indexOfFirstEvent,
        indexOfLastEvent
    );

    const formatEventTime = (date: string, time: string) => {
        return new Date(date + "T" + time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const formatEventDate = (date: string) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const EventCard = ({
        event,
        isPast = false,
    }: {
        event: Events;
        isPast?: boolean;
    }) => (
        <Card
            className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isPast
                    ? "bg-gray-800/60 opacity-60 hover:opacity-80 border-gray-700"
                    : "bg-gray-800 shadow-lg hover:shadow-xl border-gray-700"
            }`}
        >
            <div className="relative overflow-hidden">
                <img
                    src={event.poster}
                    alt={event.title}
                    className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
                        isPast ? "grayscale" : ""
                    }`}
                />
                <div className="absolute top-3 left-3">
                    <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                            isPast
                                ? "bg-gray-600 text-gray-300"
                                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold"
                        }`}
                    >
                        {isPast ? "Selesai" : "Upcoming"}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3
                    className={`font-semibold mb-2 line-clamp-2 ${
                        isPast ? "text-gray-500" : "text-white"
                    }`}
                >
                    {event.title}
                </h3>
                <div className="space-y-1 mb-4 text-sm">
                    <p className={isPast ? "text-gray-500" : "text-gray-300"}>
                        {formatEventTime(event.date, event.time)} WIB
                    </p>
                    <p className={isPast ? "text-gray-500" : "text-gray-300"}>
                        {formatEventDate(event.date)}
                    </p>
                </div>
                {!isPast ? (
                    <Link
                        href={`/event/${event.id}`}
                        className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                    >
                        Lihat Event
                    </Link>
                ) : (
                    <div className="w-full text-center bg-gray-700 text-gray-400 font-medium py-2.5 rounded-lg">
                        Event Selesai
                    </div>
                )}
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <CustomerLayout>
                {/* Hero Carousel */}
                {upcomingEvents.filter((event) => event.banner).length > 0 && (
                    <section className="mb-12">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {upcomingEvents
                                    .filter((event) => event.banner)
                                    .slice(0, 5)
                                    .map((event) => (
                                        <CarouselItem key={event.id}>
                                            <Card className="border-0 rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
                                                <Link
                                                    href={`/event/${event.id}`}
                                                >
                                                    <CardContent className="relative p-0 group">
                                                        <img
                                                            src={event.banner}
                                                            alt={event.title}
                                                            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-lg">
                                                                FEATURED
                                                            </span>
                                                            <h2 className="text-white text-2xl font-bold mb-2">
                                                                {event.title}
                                                            </h2>
                                                            <p className="text-blue-200 text-sm">
                                                                {formatEventDate(
                                                                    event.date
                                                                )}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Link>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4 bg-black/60 border-gray-600 text-white hover:bg-black/80 hover:border-blue-500 transition-colors" />
                            <CarouselNext className="right-4 bg-black/60 border-gray-600 text-white hover:bg-black/80 hover:border-blue-500 transition-colors" />
                        </Carousel>
                    </section>
                )}

                {/* Upcoming Events */}
                <section className="mb-16">
                    <div className="text-center mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-2xl py-8 px-6 border border-gray-700/50 shadow-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Event Mendatang
                                </span>
                            </h1>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Jangan lewatkan event-event menarik yang akan
                                segera hadir
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                }}
                            >
                                <EventCard event={event} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-10">
                            <div className="flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-1.5 shadow-xl border border-gray-600/30">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1.5 text-sm ${
                                        currentPage === 1
                                            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-50"
                                            : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 font-bold shadow-md hover:shadow-cyan-500/25 hover:scale-105 transform"
                                    }`}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    Prev
                                </button>

                                <div className="mx-3 px-4 py-2 bg-black/50 rounded-lg">
                                    <span className="text-white font-bold">
                                        {currentPage}
                                    </span>
                                    <span className="text-gray-400 mx-1">
                                        /
                                    </span>
                                    <span className="text-gray-300">
                                        {totalPages}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1.5 text-sm ${
                                        currentPage === totalPages
                                            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-50"
                                            : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 font-bold shadow-md hover:shadow-cyan-500/25 hover:scale-105 transform"
                                    }`}
                                >
                                    Next
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Past Events */}
                <section className="border-t border-gray-700 pt-12">
                    <div className="text-center mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-2xl py-8 px-6 border border-gray-700/30">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Event Sebelumnya
                            </h2>
                            <p className="text-gray-300">
                                Lihat kembali event-event yang telah
                                terselenggara
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                }}
                            >
                                <EventCard event={event} isPast={true} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </CustomerLayout>
        </div>
    );
}
