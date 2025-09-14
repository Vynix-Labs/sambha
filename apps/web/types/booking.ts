import { StaticImageData } from "next/image";

// types/booking.ts
export type Message = {
  id: string;
  sender: "planner" | "vendor";
  text: string;
  time: string; // ISO
};

export type Milestone = {
  id: string;
  title: string;
  amount: number;
  date?: string;
  completed?: boolean;
  image?: StaticImageData | string;
};

export type Booking = {
  id: string;
  slug: string;
  name: string;
  venue: string;
  host?: string;
  dateRange: string;
  pricePerDay: number;
  guests: number;
  total: number;
  snippet?: string;
  description?: string;
  createdAt?: string;
  messages?: Message[];
  milestones?: Milestone[];
};
