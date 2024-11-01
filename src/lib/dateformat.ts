export default function getFormattedDate() {
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
