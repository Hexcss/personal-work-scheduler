import { Event } from '@prisma/client';
import { useState } from 'react';

type EventFormProps = {
  onAddEvent: (event: Event) => void;
};

export default function EventForm({ onAddEvent }: EventFormProps) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    recurrence: '',
  });

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.startTime || !newEvent.endTime) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        onAddEvent(addedEvent);
        setNewEvent({ title: '', startTime: '', endTime: '', recurrence: '' });
      } else {
        console.error('Error adding event:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="block w-full px-4 py-2 mb-4 border rounded-md"
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={newEvent.startTime}
        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
        className="block w-full px-4 py-2 mb-4 border rounded-md"
      />
      <input
        type="datetime-local"
        placeholder="End Time"
        value={newEvent.endTime}
        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
        className="block w-full px-4 py-2 mb-4 border rounded-md"
      />
      <select
        value={newEvent.recurrence}
        onChange={(e) => setNewEvent({ ...newEvent, recurrence: e.target.value })}
        className="block w-full px-4 py-2 mb-4 border rounded-md"
      >
        <option value="">No Recurrence</option>
        <option value="monday">Every Monday</option>
        <option value="tuesday">Every Tuesday</option>
        <option value="wednesday">Every Wednesday</option>
        <option value="thursday">Every Thursday</option>
        <option value="friday">Every Friday</option>
      </select>
      <button
        onClick={handleAddEvent}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Add Event
      </button>
    </div>
  );
}
