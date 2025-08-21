"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@sambha/ui/dialog";
import { useAtom } from "jotai";
import { modalAtom } from "../store/modalAtom";
import { X } from "lucide-react";

interface ChatModalProps {
  children?: React.ReactNode;
  title?: string;
}

export function Modal({ children, title }: ChatModalProps) {
  const [modal, setModal] = useAtom(modalAtom);
  const { isOpen, size = "md" } = modal;
  console.log(size);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setModal((prev) => ({ ...prev, isOpen: open }))}
    >
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        className={`max-h-[calc(100vh-2rem)] outline-none overflow-y-auto thin-scrollbar max-md:w-sm rounded-[20px] lg:max-w-${size} md:max-w-md bg-white-main text-black`}
      >
        <DialogClose asChild>
          <button
            className="absolute top-3 right-3 text-error-base rounded-xl p-1 bg-error-base/10  focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>
        <DialogHeader className="text-black">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
