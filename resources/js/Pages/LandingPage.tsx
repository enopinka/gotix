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
import React from "react";

export default function LandingPage() {
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
                        {[
                            "/carousel/carousel1.jpg",
                            "/carousel/carousel2.jpg",
                            "/carousel/carousel3.jpg",
                            "/carousel/carousel4.jpg",
                            "/carousel/carousel5.jpg",
                            "/carousel/carousel6.jpg",
                            "/carousel/carousel7.jpg",
                            "/carousel/carousel8.jpg",
                            "/carousel/carousel9.jpg",
                            "/carousel/carousel10.jpg",
                        ].map((src, index) => (
                            <CarouselItem
                                key={index}
                                className=" pl-4 basis-auto w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                            >
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="p-0">
                                            <img
                                                src={src}
                                                alt={`Slide ${index + 1}`}
                                                className="rounded-lg object-cover aspect-[2/3] w-full"
                                            />
                                        </CardContent>
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
