import PartnerLayout from "@/Layouts/PartnerLayout";

type Category = {
    type: string;
    price: number;
    quota: number;
};

type Event = {
    title: string;
    description: string;
    date: Date;
    time: string;
    place: string;
    poster: string;
    seating_chart: string;
};

type EventDetailProps = {
    event: Event;
    categories: Category[];
};

export default function EventDetail({ event, categories }: EventDetailProps) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <PartnerLayout>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <p>{event.place}</p>
                <p>{formattedDate}</p>
                <p>{event.time}</p>
            </PartnerLayout>
            ;
        </>
    );
}
