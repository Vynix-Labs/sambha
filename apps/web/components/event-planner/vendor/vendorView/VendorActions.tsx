"use client";

import { Button } from "@sambha/ui/button";
import { ButtonLink } from "@sambha/ui/buttonLink";

interface VendorActionsProps {
  vendorId: string;
}

export function VendorActions({ vendorId }: VendorActionsProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <ButtonLink
        href={`/event-planner/vendors/view/${vendorId}/book-now`}
        variant="primary"
      >
        Book now
      </ButtonLink>

      <ButtonLink
        href={`/event-planner/vendors/view/${vendorId}/make-offer`}
        variant="primary"
      >
        Make an offer
      </ButtonLink>

      <Button>Message</Button>
    </div>
  );
}
