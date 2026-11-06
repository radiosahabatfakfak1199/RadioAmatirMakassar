const WEEKDAY_NAMES = [
  ['Sunday', 'Minggu'],
  ['Monday', 'Senin'],
  ['Tuesday', 'Selasa'],
  ['Wednesday', 'Rabu'],
  ['Thursday', 'Kamis'],
  ['Friday', 'Jumat'],
  ['Saturday', 'Sabtu'],
] as const;

export function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function isProgramToday(day: string | null): boolean {
  if (!day) return false;
  const [english, indonesian] = WEEKDAY_NAMES[new Date().getDay()];
  const normalized = day.trim().toLowerCase();
  return normalized === english.toLowerCase() || normalized === indonesian.toLowerCase();
}

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}
