import { Event } from "@prisma/client";


type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <li className="p-6 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
      <p className="text-gray-600">
        Start: {new Date(event.startTime).toLocaleString()}
      </p>
      <p className="text-gray-600">
        End: {new Date(event.endTime).toLocaleString()}
      </p>
      {event.recurrence && (
        <p className="text-sm text-gray-500">Recurring: {event.recurrence}</p>
      )}
    </li>
  );
}
