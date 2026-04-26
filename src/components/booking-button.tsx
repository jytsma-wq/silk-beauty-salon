"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";

interface BookingButtonProps {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function BookingButton({
  children = "Book Appointment",
  variant = "default",
  className = "",
  size = "default",
}: BookingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <BookingDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
