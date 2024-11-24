import { Event } from '@prisma/client';

export type ExpandedEvent = Event & {
  startTime: Date;
  endTime: Date;
};

