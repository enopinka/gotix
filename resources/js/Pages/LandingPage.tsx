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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/Components/ui/pagination"



type Events = {
    id: number;
    title: string;
    poster: string;
    date: string;
    time: string;
    price: string;
    category: string;
};

type LandingPageProps = {
    events: Events[];
};

export default function LandingPage({ events }: LandingPageProps) {
    
    return (
        <>
            <CustomerLayout>
                <p>Ini halaman landing page</p>

                <Carousel

                    className="w-full px-4 py-8"
                >
                    <CarouselContent>
                        {events.map((event) => (
                            <CarouselItem
                                key={event.id}
                                className=" pl-4 basis-auto w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                            >
                                <div className="p-1">
                                    <Card>
                                        <Link href={`/event/${event.id}`}>
                                            <CardContent className="relative p-0 border-none group overflow-hidden">
                                                <img
                                                    src={event.poster}
                                                    alt={event.title}
                                                    className="rounded-lg relative object-cover aspect-[2/3] w-full"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50
                                                                opacity-0 group-hover:opacity-100
                                                                transition-opacity duration-200
                                                                flex flex-col justify-end p-4">
                                                    <p className="text-white text-base font-semibold truncate">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-sm font-light">
                                                        {event.date}
                                                    </p>
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
                        {events.map((event) => (
                            <Card key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={event.poster}
                                        alt={event.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                                        {event.category}
                                    </div>
                                    <div className="absolute top-2 right-2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded">
                                        {event.date}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold truncate">{event.title}</h3>
                                    <p className="text-sm text-gray-500">{event.time}</p>
                                    <p className="text-sm text-gray-500">From: {event.price}</p>
                                    <Link
                                        href={`/event/${event.id}`}
                                        className="mt-4 block bg-purple-600 text-white text-center text-sm font-semibold py-2 rounded hover:bg-purple-700"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </Card>
                        ))}
                        
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
