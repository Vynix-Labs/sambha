export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  guests: number;
  userId: string;
}

export const events: Event[] = [
  {
    id: "1",
    name: "Oliver & Emily's Wedding",
    description: "Wedding ceremony and reception",
    date: "May 1 - 2, 2025",
    guests: 100,
    userId: "user1",
  },
  {
    id: "2",
    name: "Corporate Annual Gala",
    description: "Company annual celebration event",
    date: "June 15, 2025",
    guests: 200,
    userId: "user2",
  },
  {
    id: "3",
    name: "Sarah's 30th Birthday",
    description: "Milestone birthday celebration",
    date: "July 20, 2025",
    guests: 50,
    userId: "user3",
  },
];

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id);
}
