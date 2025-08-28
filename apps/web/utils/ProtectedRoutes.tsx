"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";

// const dummyAuth = { role: "planner" }; // Change this to 'vendor' or 'guest' to test

// const allowedRoles = ["planner", "vendor", "guest"];

const ProtectedRoute = ({
  children,
  role,
}: {
  children?: ReactNode;
  role: string;
}) => {
  const router = useRouter();
  const allowedRoles = ["planner", "vendor", "guest"];

  if (!allowedRoles.includes(role)) {
    toast.error(`Only ${allowedRoles.join(", ")} can access this route`, {
      autoClose: 5000,
    });
    router.push("/login");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
