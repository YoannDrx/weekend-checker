export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type ZonedDateParts = {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (timeZone: string) => {
  const cached = formatterCache.get(timeZone);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  formatterCache.set(timeZone, formatter);
  return formatter;
};

const getDefaultTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

const getZonedParts = (date: Date, timeZone: string): ZonedDateParts => {
  const values = Object.fromEntries(
    getFormatter(timeZone)
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  const year = values.year;
  const month = values.month;
  const day = values.day;

  return {
    year,
    month,
    day,
    weekday: new Date(Date.UTC(year, month - 1, day)).getUTCDay(),
    hours: values.hour,
    minutes: values.minute,
    seconds: values.second,
  };
};

const getTimeZoneOffset = (date: Date, timeZone: string) => {
  const parts = getZonedParts(date, timeZone);
  const representedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hours,
    parts.minutes,
    parts.seconds,
  );
  return representedAsUtc - Math.floor(date.getTime() / 1000) * 1000;
};

const zonedDateTimeToDate = (
  values: Omit<ZonedDateParts, "weekday">,
  timeZone: string,
) => {
  const utcGuess = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hours,
    values.minutes,
    values.seconds,
  );
  let result = new Date(utcGuess - getTimeZoneOffset(new Date(utcGuess), timeZone));
  const correctedOffset = getTimeZoneOffset(result, timeZone);
  result = new Date(utcGuess - correctedOffset);
  return result;
};

const addCalendarDays = (
  parts: ZonedDateParts,
  days: number,
  hours: number,
  timeZone: string,
) => {
  const calendarDate = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + days),
  );
  return zonedDateTimeToDate(
    {
      year: calendarDate.getUTCFullYear(),
      month: calendarDate.getUTCMonth() + 1,
      day: calendarDate.getUTCDate(),
      hours,
      minutes: 0,
      seconds: 0,
    },
    timeZone,
  );
};

export function isWeekend(
  date: Date,
  timeZone = getDefaultTimeZone(),
): boolean {
  const parts = getZonedParts(date, timeZone);
  return (
    parts.weekday === 6 ||
    parts.weekday === 0 ||
    (parts.weekday === 5 && parts.hours >= 12)
  );
}

export function getNextFriday(
  from: Date,
  timeZone = getDefaultTimeZone(),
): Date {
  const parts = getZonedParts(from, timeZone);
  let daysToAdd = (5 - parts.weekday + 7) % 7;

  if (daysToAdd === 0 && parts.hours >= 12) {
    daysToAdd = 7;
  }

  return addCalendarDays(parts, daysToAdd, 12, timeZone);
}

export function getWeekendEnd(
  from: Date,
  timeZone = getDefaultTimeZone(),
): Date {
  const parts = getZonedParts(from, timeZone);
  let daysToAdd = (1 - parts.weekday + 7) % 7;
  if (daysToAdd === 0) daysToAdd = 7;
  return addCalendarDays(parts, daysToAdd, 0, timeZone);
}

export function getTimeRemaining(from: Date, to: Date): TimeRemaining {
  const diffInMs = to.getTime() - from.getTime();

  if (diffInMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diffInMs / 86_400_000);
  const hours = Math.floor((diffInMs % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diffInMs % 3_600_000) / 60_000);
  const seconds = Math.floor((diffInMs % 60_000) / 1000);

  return { days, hours, minutes, seconds };
}

export function formatTimeRemaining(time: TimeRemaining): string {
  const dayPart =
    time.days > 0
      ? `${time.days.toString().padStart(2, "0")} jour${time.days > 1 ? "s" : ""} `
      : "";
  const clockPart = [time.hours, time.minutes, time.seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
  return `${dayPart}${clockPart}`;
}
