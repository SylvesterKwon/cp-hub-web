export function durationSecondsToString(durationSeconds: number) {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = String(Math.floor((durationSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  return `${hours}:${minutes}`;
}
