import { Card, CardContent } from "@/Components/ui/card";
import { Dialog,  DialogContent} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
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

;
    
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
    
    const [open, setOpen] = useState(false);

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
                    ? "bg-gray-800/60 opacity-60 hover:opacity-80 "
                    : "bg-gray-800 shadow-lg hover:shadow-xl "
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
                        {isPast ? "Passed" : "Upcoming"}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3
                    className={`font-semibold mb-2 line-clamp-2 ${
                        isPast ? "text-white" : "text-white"
                    }`}
                >
                    {event.title}
                </h3>
                <div className="space-y-1 mb-4 text-sm">
                    <p className={isPast ? "text-white" : "text-gray-300"}>
                        {formatEventTime(event.date, event.time)} WIB
                    </p>
                    <p className={isPast ? "text-white" : "text-gray-300"}>
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
                {upcomingEvents.length > 0 && (
                    <Link
                        href={`/event/${upcomingEvents[0].id}`}
                        className="mb-16 block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
                        >
                            <img
                                src={upcomingEvents[0].poster}
                                alt={upcomingEvents[0].title}
                                className="w-full h-[75vh] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                        {upcomingEvents[0].title}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 text-gray-200 text-sm font-medium">
                                        <span>
                                            {formatEventDate(upcomingEvents[0].date)}
                                        </span>
                                        <span>
                                            {formatEventTime(upcomingEvents[0].date, upcomingEvents[0].time)} WIB
                                        </span>
                                        <span>
                                            {upcomingEvents[0].category}
                                        </span>
                                        <span>
                                            {upcomingEvents[0].price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                )}
                <section className="mb-16">
                    <div className="text-left mb-8 ">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Upcoming Events
                                </span>
                            </h1>
                            <p className=" text-gray-800 text-lg ">
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
                            <div className="flex items-center bg-gray-100 rounded-xl p-1.5 border border-gray-600/30">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1.5 text-sm ${
                                        currentPage === 1
                                            ? "bg-gray-700 text-gray-100 cursor-not-allowed opacity-50"
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

                 <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-cyan-500  rounded-2xl shadow-lg p-8 my-8">
                    
                    <div className="flex items-center gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                GOTIX <br /> Get Online Ticket
                            </h2>
                            <p className="text-white text-base">
                                Gotix berkomitmen mendukung industri seni, festival, dan event di Indonesia bersama GOTIX.
                            </p>
                        </div>
                    </div>
                    {/* Tombol */}
                    <Button
                        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold px-8 py-3 rounded-full text-lg shadow transition-all duration-200"
                        onClick={() => setOpen(true)}
                    >
                        Discover more about GOTIX here&nbsp; &rarr;
                    </Button>
                </div>

                {open && (
                    // Dialog hanya muncul ketika open = true
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="bg-white rounded-2xl shadow-xl max-w-md mx-auto p-0 overflow-hidden">
                            
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-400 px-8 pt-8 pb-6 text-center relative">
                               
                                <svg className="absolute bottom-0 left-0 w-full" height="32" viewBox="0 0 400 32" fill="none">
                                    <path d="M0 32V0C66.6667 21.3333 133.333 21.3333 200 0C266.667 21.3333 333.333 21.3333 400 0V32H0Z" fill="#fff" fillOpacity="0.7"/>
                                </svg>
                                <h2 className="text-2xl font-bold text-white relative z-10 mb-1">Tentang GOTIX</h2>
                                <div className="text-white/80 text-base relative z-10 mb-2">Get Online Ticket</div>
                            </div>
                            
                            <div className="px-8 pt-8 pb-6 text-center">
                                <p className="text-gray-500 mb-8">
                                    GOTIX (Get Online Ticket) adalah platform yang didedikasikan untuk mendukung industri seni, festival, dan event di Indonesia. Kami menyediakan solusi tiket online yang mudah digunakan, aman, dan efisien untuk membantu penyelenggara acara dalam mengelola tiket dan meningkatkan pengalaman pengunjung.
                                </p>
                                
                                <Button
                                    onClick={() => setOpen(false)}
                                    className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-full py-3 shadow-md transition-all duration-200"
                                >
                                    Tutup
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

              
                <section className="pt-12">
                    <div className="text-left mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-2xl py-8 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-2">
                                Past Event
                            </h2>
                            <p className="text-gray-300 mb-8">
                                Lihat kembali event-event yang telah
                                terselenggara
                            </p>
                        </motion.div>
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
                    </div>
                </section>
            </CustomerLayout>
        </div>
    );
    
}
