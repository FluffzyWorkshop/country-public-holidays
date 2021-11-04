export function getFormattedDate(year: number, month: number, day: number): string {
  return `${year}-${(month <= 9 ? '0' + month : month)}-${(day <= 9 ? '0' + day : day)}`;
}

export function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24) + 1;
}

export function getMonths(): string[] {
  return ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
}

export function isWeekend(date: Date): boolean {
  return date.getDay() == 0 || date.getDay() == 6;
}

export function dateRange(start: Date, end: Date, steps = 1): Date[] {
  const dateArray = [];
  let currentDate = start;
  while (currentDate <= end) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
}

export function weekendCalculator(start: Date, end: Date): number {
  let free = 0;
  let currentDate = start;
  while (currentDate <= end) {
    if (isWeekend(currentDate)) {
      free++;
    }
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return free;
}
