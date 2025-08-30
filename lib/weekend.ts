export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay(); // 0 = Dimanche, 5 = Vendredi, 1 = Lundi
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Vendredi à partir de 12:00:00
  if (day === 5 && (hours > 12 || (hours === 12 && minutes >= 0 && seconds >= 0))) {
    return true;
  }
  
  // Samedi et dimanche (toute la journée)
  if (day === 6 || day === 0) {
    return true;
  }
  
  return false;
}

export function getNextFriday(from: Date): Date {
  const nextFriday = new Date(from);
  
  // Calculer les jours jusqu'au prochain vendredi
  const currentDay = from.getDay();
  let daysToAdd: number;
  
  if (currentDay < 5) {
    // On est avant vendredi dans la semaine courante
    daysToAdd = 5 - currentDay;
  } else if (currentDay === 5) {
    // On est vendredi
    const hours = from.getHours();
    if (hours < 12) {
      // Avant 12:00, on prend aujourd'hui
      daysToAdd = 0;
    } else {
      // Après 12:00, on prend le vendredi suivant
      daysToAdd = 7;
    }
  } else {
    // On est samedi (6) ou dimanche (0)
    daysToAdd = currentDay === 6 ? 6 : 5; // Samedi -> +6, Dimanche -> +5
  }
  
  nextFriday.setDate(nextFriday.getDate() + daysToAdd);
  nextFriday.setHours(12, 0, 0, 0);
  
  return nextFriday;
}

export function getWeekendEnd(from: Date): Date {
  const weekendEnd = new Date(from);
  
  // Trouver le lundi suivant à 00:00:00
  const currentDay = from.getDay();
  let daysToAdd: number;
  
  if (currentDay === 0) {
    // Dimanche -> lundi suivant
    daysToAdd = 1;
  } else if (currentDay >= 1 && currentDay <= 4) {
    // Lundi à jeudi -> lundi suivant
    daysToAdd = 8 - currentDay;
  } else if (currentDay === 5) {
    // Vendredi
    const hours = from.getHours();
    if (hours >= 12) {
      // Après 12:00 vendredi -> lundi suivant
      daysToAdd = 3;
    } else {
      // Avant 12:00 vendredi -> lundi suivant
      daysToAdd = 10;
    }
  } else {
    // Samedi
    daysToAdd = 2;
  }
  
  weekendEnd.setDate(weekendEnd.getDate() + daysToAdd);
  weekendEnd.setHours(0, 0, 0, 0);
  
  return weekendEnd;
}

export function getTimeRemaining(from: Date, to: Date): TimeRemaining {
  const diffInMs = to.getTime() - from.getTime();
  
  if (diffInMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

export function formatTimeRemaining(time: TimeRemaining): string {
  const { days, hours, minutes, seconds } = time;
  
  const parts: string[] = [];
  
  if (days > 0) {
    parts.push(`${days.toString().padStart(2, '0')} jour${days > 1 ? 's' : ''}`);
  }
  
  parts.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  
  return parts.join(' ');
}