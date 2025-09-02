export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/%26/g, "and") // Optional: replace '&' with 'and'
    .replace(/\s+/g, "_")
    .replace(/&/g, "and");
