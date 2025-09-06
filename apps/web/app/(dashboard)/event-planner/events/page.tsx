"use client";
import { Button } from "@sambha/ui/button";
import Link from "next/link";
// import { useParams } from "next/navigation";
import React from "react";

export default function EventPage() {
  // const { eventSlug } = useParams();
  const event = {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  };

  return (
    <div className="py-6 space-y-4">
      <h1 className=" font-bold">Event:</h1>
      <p>This is a placeholder event detail page.</p>

      <div>
        <Link href={`/event-planner/events/${event.slug}`}>
          <Button> Create EventSlugPage</Button>
        </Link>
      </div>
    </div>
  );
}