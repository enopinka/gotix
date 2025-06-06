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
    const eventsPerPage = 8; // 4x4

    const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = upcomingEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    return (
        <>
            <CustomerLayout>

                <Carousel

                    className="w-full px-4 py-8"
                >
                    <CarouselContent>
                    {events
                    .filter((event) => new Date(event.date) >= new Date() && event.banner) // Filter out events that are late or missing a banner
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by closest date
                    .slice(0, 5) // Limit to 5 closest events
                    .map((event) => (
                        <CarouselItem
                            key={event.id}
                            className="px-4" // Adjusted sizes
                        >
                            <div className="p-2">
                                <Card>
                                    <Link href={`/event/${event.id}`}>
                                        <CardContent className="relative p-0 border-none group overflow-hidden">
                                            <img
                                                src={event.banner}
                                                alt={event.title}
                                                className="rounded-lg relative object-cover aspect-[9/3] w-full"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-200 group-hover:opacity-0">
                                                <p className="text-white text-3xl font-bold truncate">{event.title}</p>
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-75
                                                            opacity-0 group-hover:opacity-100
                                                            transition-opacity duration-200
                                                            flex flex-col justify-end p-4">
                                                <p className="text-white text-xl font-bold truncate">{event.title}</p>
                                                <p className="text-white text-sm font-light">{event.date}</p>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious 
                       style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(209, 213, 219, 0.5)', // Contoh warna dengan alpha untuk transparansi
                        borderRadius: '9999px',
                        padding: '0.5rem',
                        opacity: 0.5,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                    />
                    <CarouselNext 
                         style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(209, 213, 219, 0.5)', // Contoh warna dengan alpha untuk transparansi
                            borderRadius: '9999px',
                            padding: '0.5rem',
                            opacity: 0.5,
                            transition: 'opacity 0.2s ease-in-out',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                    />
                </Carousel>

                <div className="max-w-7xl mx-auto py-8 px-4">
                  <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        
                        {currentEvents.map((event) => {
                            const eventTime = new Date(event.date + 'T' + event.time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            });

                            return (
 
                                    <Card key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={event.poster}
                                                alt={event.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded bg-green-500">
                                                Upcoming
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold truncate">{event.title}</h3>
                                            <p className="text-sm text-gray-500">{eventTime} WIB</p>
                                            <p className="text-sm text-gray-500">{event.date}</p>
                                            <Link
                                                href={`/event/${event.id}`}
                                                className="mt-4 block text-center text-sm font-semibold py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                                            >
                                                Buy Now
                                            </Link>
                                        </div>
                                    </Card>
                                );
                            })}

                    <div className="flex justify-center items-center mt-8 space-x-4 col-span-full">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        >
                            Next
                        </button>
                    </div>

                    </div>

                    <h1 className="text-2xl font-bold mt-12 mb-6">Passed Events</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {events
                            .filter((event) => new Date(event.date) < new Date())
                            .slice(0, 8)
                            .map((event) => {
                                const eventTime = new Date(event.date + 'T' + event.time).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                });
                                return (
                                    <Card
                                        key={event.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden opacity-50 pointer-events-none"
                                    >
                                        <div className="relative">
                                            <img
                                                src={event.poster}
                                                alt={event.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded bg-red-500">
                                                Passed
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold truncate">{event.title}</h3>
                                            <p className="text-sm text-gray-500">{eventTime} WIB</p>
                                            <p className="text-sm text-gray-500">{event.date}</p>
                                            <span className="mt-4 block text-center text-sm font-semibold py-2 rounded bg-gray-400 text-gray-700 cursor-not-allowed">
                                                Unavailable
                                            </span>
                                        </div>
                                    </Card>
                                );
                            })}
                    </div>
                
                </div>
            </CustomerLayout>
        </>
    );
}
