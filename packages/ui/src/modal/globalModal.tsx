import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { ReactNode, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  showCloseButton?: boolean;
  preventOutsideClick?: boolean;
};

function GlobalModal({
  isOpen,
  onOpenChange,
  children,
  showCloseButton = false,
  preventOutsideClick = false,
}: Props) {
  // Method 1: Simply ignore the onClose when we want to prevent closing
  const handleClose = () => {
    if (!preventOutsideClick) {
      onOpenChange(false);
    }
    // If preventOutsideClick is true, just ignore the close attempt
  };

  // Method 2: Disable escape key when preventOutsideClick is true
  useEffect(() => {
    if (!isOpen || !preventOutsideClick) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Capture the event before it reaches Headless UI Dialog
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, preventOutsideClick]);

  if (!isOpen) return null;

  return (
    <Dialog
      onClose={handleClose} // This will only close if preventOutsideClick is false
      open={isOpen}
      className="relative z-[99] focus:outline-none"
      // NO static prop - this was causing an issue
    >
      <div
        className="bg-[#000000]/10 backdrop-blur-sm fixed inset-0 transition ease-in-out duration-300"
        aria-hidden="true"
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <DialogPanel
            transition
            className="w-fit flex-col flex rounded-xl relative p-8 bg-primary-light duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
          >
            {/* Close button - show if specified OR if outside click is prevented */}
            {(showCloseButton || preventOutsideClick) && (
              <button
                onClick={() => onOpenChange(false)} // This will always work
                className="self-start bg-error-50/5 text-error-50 rounded-lg size-8 flex items-center justify-center absolute right-8 top-8 hover:bg-error-50/10 transition-colors"
              >
                <XIcon size={22} className="text-error-50" />
              </button>
            )}

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default GlobalModal;
