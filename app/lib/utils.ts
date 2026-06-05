export function getCalendarWeek(referenceDate: Date) {
  const day = referenceDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day; //biar minggu dimulai dari Senin, kalau hari Minggu (0) mundur 6 hari, kalau bukan, hitung mundur ke Senin (1-6)
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + mondayOffset);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}