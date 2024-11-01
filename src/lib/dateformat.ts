/**
 * Returns the current date and time formatted according to Indonesian locale (id-ID).
 * The format includes two-digit day, month, year, hour, and minute, with a 24-hour clock.
 * Periods in the formatted string are replaced with colons.
 *
 * @returns {string} The formatted date and time string.
 */
export default function getFormattedDate(): string {
  const now = new Date();
  return now
    .toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\./g, ":");
}
