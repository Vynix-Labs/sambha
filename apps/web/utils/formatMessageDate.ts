import { format, isToday, isYesterday, parseISO, isValid } from "date-fns";

/**
 * Format a date or timestamp string for message UI
 * @param input - ISO string or timestamp number/string
 * @param options - optional return format style
 */
export function formatFlexibleDate(
  input: string | number,
  options?: {
    formatStyle?: "time" | "short" | "weekday" | "full";
  }
): string {
  let date: Date;

  if (typeof input === "string") {
    if (!isNaN(Number(input))) {
      date = new Date(Number(input));
    } else {
      date = parseISO(input);
    }
  } else {
    date = new Date(input);
  }

  if (!isValid(date)) return "Invalid Date";

  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  switch (options?.formatStyle) {
    case "short":
      return format(date, "MMM dd");
    case "weekday":
      return format(date, "EEE, MMM dd");
    case "full":
      return format(date, "MMMM dd, yyyy");
    case "time":
      return format(date, "h:mm a");
    default:
      return format(date, "M/dd/yyyy");
  }
}
