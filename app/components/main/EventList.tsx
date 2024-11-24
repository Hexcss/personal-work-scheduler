import EventCard from "@/app/components/main/EventCard";
import { Event } from "@prisma/client";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Events</h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events found.</p>
      )}
    </div>
  );
}
