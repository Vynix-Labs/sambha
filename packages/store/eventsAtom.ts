// store/eventFormStore.ts
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 🧠 Type for Event form
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  eventType: string;
  isOneOffEvent: boolean;
  organizer: string;
  attendees: string[];

  // Enhanced fields for the form
  budget?: string;
  expectedGuests?: number;
  currency?: string;
  asset?: string;
  coveredAsset?: string;
  isFixedBudget?: boolean;
  inviteEmails?: string[];
  coverImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

//  Stepper State with Persistence (localStorage)
export const StepperAtom = atomWithStorage<number>("event-step", 1);

//  Stepper Actions: Next, Previous, Reset
export const handleNextStepAtom = atom(null, (get, set) => {
  const currentStep = get(StepperAtom);
  if (currentStep < 4) {
    set(StepperAtom, currentStep + 1);
  }
});

export const handlePreviousStepAtom = atom(null, (get, set) => {
  const currentStep = get(StepperAtom);
  if (currentStep > 1) {
    set(StepperAtom, currentStep - 1);
  }
});

export const resetStepperAtom = atom(null, (_get, set) => {
  set(StepperAtom, 1);
});

// Event Form State with Persistence
export const eventFormAtom = atomWithStorage<Event>("event-form", {
  id: "",
  title: "",
  description: "",
  date: "",
  location: "",
  isOneOffEvent: false,
  eventType: "",
  organizer: "",
  attendees: [],
  budget: "",
  expectedGuests: 0,
  currency: "ngn",
  asset: "btc",
  coveredAsset: "",
  isFixedBudget: false,
  inviteEmails: [],
  coverImage: null,
});

//  Atom to Update Form Dynamically
export const updateEventFormAtom = atom(
  null,
  (get, set, updatedFields: Partial<Event>) => {
    const currentForm = get(eventFormAtom);
    const updatedForm = {
      ...currentForm,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    set(eventFormAtom, updatedForm);
  }
);

// Atom to clear form data
export const clearEventFormAtom = atom(null, (_get, set) => {
  set(eventFormAtom, {
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    isOneOffEvent: false,
    eventType: "",
    organizer: "",
    attendees: [],
    budget: "",
    expectedGuests: 0,
    currency: "ngn",
    asset: "btc",
    coveredAsset: "",
    isFixedBudget: false,
    inviteEmails: [],
    coverImage: null,
  });
  set(StepperAtom, 1);
});

// Validation atoms
export const isStep1ValidAtom = atom((get) => {
  const form = get(eventFormAtom);
  return !!(form.title && form.eventType && form.location);
});

export const isStep2ValidAtom = atom((get) => {
  const form = get(eventFormAtom);
  if (form.isFixedBudget) {
    return !!(form.expectedGuests && form.expectedGuests > 0);
  }
  return !!(form.budget && form.expectedGuests && form.expectedGuests > 0);
});

// Form submission status atom
export const formSubmissionAtom = atomWithStorage<{
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}>("form-submission", {
  isSubmitting: false,
  isSuccess: false,
  error: null,
});
