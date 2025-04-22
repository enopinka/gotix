import { Card, CardContent } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@inertiajs/react";
import React from "react";

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
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    );
    return (
        <>
            <CustomerLayout>
                <p>Ini halaman landing page</p>

                <Carousel
                    plugins={[plugin.current]}
                    className="w-full px-4 py-8"
                    onMouseLeave={plugin.current.reset}
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
                                            <CardContent className="p-0 hover:shadow-lg h-96 border-none">
                                                <img
                                                    src={event.poster}
                                                    alt={event.title}
                                                    className="rounded-lg relative object-cover aspect-[2/3] w-full"
                                                />
                                                <div className="p-4">
                                                    <p className="text-base font-semibold overflow-hidden">
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
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CustomerLayout>
        </>
    );
}
