  'use client';

  import { useEffect, useState } from 'react';
  import { signIn, useSession } from 'next-auth/react';
  import Header from "@/app/components/main/Header";
  import EventForm from "@/app/components/main/EventForm";
  import EventList from "@/app/components/main/EventList";
  import { Event } from "@prisma/client";

  export default function HomePage() {
    const { data: session } = useSession();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
      if (session) {
        fetch('/api/events')
          .then((res) => res.json())
          .then((data) => setEvents(data))
          .catch((error) => console.error('Error fetching events:', error));
      }
    }, [session]);

    const addEvent = (newEvent: Event) => {
      setEvents((prev) => [...prev, newEvent]);
    };

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
        {session ? (
          <>
            <Header name={session.user?.name || ''} />
            <div className="flex px-8 py-6 space-x-8">
              {/* Left Column: Event Form */}
              <div className="w-1/2">
                <EventForm onAddEvent={addEvent} />
              </div>

              {/* Right Column: Event List */}
              <div className="w-1/2">
                <EventList events={events} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center flex flex-grow items-center justify-center">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Sign in to manage your events</h1>
              <button
                onClick={() => signIn('google')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                Login with Google
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
