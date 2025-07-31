import React from "react";
import ProtectedRoute from "../../../utils/ProtectedRoutes";
import { ReviewsProvider } from "components/event-planner/vendor/vendorView/ReviewsContext";

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ProtectedRoute role="planner">
      <ReviewsProvider>{children}</ReviewsProvider>
    </ProtectedRoute>
  );
}
