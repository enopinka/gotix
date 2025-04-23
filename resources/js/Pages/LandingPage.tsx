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


type Events = {
    id: number;
    title: string;
    poster: string;
    date: string;
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
            </CustomerLayout>
        </>
    );
}
