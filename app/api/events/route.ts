import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { addDays, startOfWeek } from 'date-fns';
import { ExpandedEvent } from '@/app/types/types';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { events: true },
  });

  if (!user) return NextResponse.json([]);

  const events = user.events || [];

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const expandedEvents: ExpandedEvent[] = [];

  events.forEach((event) => {
    if (event.recurrence) {
      const recurringDays = event.recurrence.split(',');

      for (let i = 0; i < 7; i++) {
        const day = addDays(weekStart, i);
        const dayName = day
          .toLocaleString('en-US', { weekday: 'long' })
          .toLowerCase();

        if (recurringDays.includes(dayName)) {
          const startTime = new Date(event.startTime);
          const endTime = new Date(event.endTime);

          expandedEvents.push({
            ...event,
            startTime: new Date(
              day.setHours(startTime.getHours(), startTime.getMinutes())
            ),
            endTime: new Date(
              day.setHours(endTime.getHours(), endTime.getMinutes())
            ),
          });
        }
      }
    } else {
      expandedEvents.push({
        ...event,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
      });
    }
  });

  return NextResponse.json(expandedEvents);
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, startTime, endTime, recurrence } = await req.json();

  // Find the user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      recurrence,
      userId: user.id,
    },
  });

  return NextResponse.json(event);
}
