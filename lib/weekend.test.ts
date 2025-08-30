import { describe, it, expect } from 'vitest';
import { isWeekend, getNextFriday, getWeekendEnd, getTimeRemaining, formatTimeRemaining } from './weekend';

describe('Weekend Logic', () => {
  describe('isWeekend', () => {
    it('should return false for vendredi 11:59:59', () => {
      const date = new Date('2024-01-05T11:59:59'); // Vendredi 5 janvier 2024, 11:59:59
      expect(isWeekend(date)).toBe(false);
    });

    it('should return true for vendredi 12:00:00', () => {
      const date = new Date('2024-01-05T12:00:00'); // Vendredi 5 janvier 2024, 12:00:00
      expect(isWeekend(date)).toBe(true);
    });

    it('should return true for vendredi 12:00:01', () => {
      const date = new Date('2024-01-05T12:00:01'); // Vendredi 5 janvier 2024, 12:00:01
      expect(isWeekend(date)).toBe(true);
    });

    it('should return true for samedi toute la journée', () => {
      const samediMatin = new Date('2024-01-06T08:00:00'); // Samedi 6 janvier 2024, 8:00
      const samediSoir = new Date('2024-01-06T23:59:59'); // Samedi 6 janvier 2024, 23:59:59
      expect(isWeekend(samediMatin)).toBe(true);
      expect(isWeekend(samediSoir)).toBe(true);
    });

    it('should return true for dimanche 23:59:59', () => {
      const date = new Date('2024-01-07T23:59:59'); // Dimanche 7 janvier 2024, 23:59:59
      expect(isWeekend(date)).toBe(true);
    });

    it('should return false for lundi 00:00:00', () => {
      const date = new Date('2024-01-08T00:00:00'); // Lundi 8 janvier 2024, 00:00:00
      expect(isWeekend(date)).toBe(false);
    });

    it('should return false for lundi à jeudi', () => {
      const lundi = new Date('2024-01-08T14:30:00'); // Lundi 8 janvier 2024, 14:30
      const mardi = new Date('2024-01-09T10:00:00'); // Mardi 9 janvier 2024, 10:00
      const mercredi = new Date('2024-01-10T16:45:00'); // Mercredi 10 janvier 2024, 16:45
      const jeudi = new Date('2024-01-11T09:15:00'); // Jeudi 11 janvier 2024, 09:15
      
      expect(isWeekend(lundi)).toBe(false);
      expect(isWeekend(mardi)).toBe(false);
      expect(isWeekend(mercredi)).toBe(false);
      expect(isWeekend(jeudi)).toBe(false);
    });
  });

  describe('getNextFriday', () => {
    it('should return the same day if vendredi before 12:00', () => {
      const vendrediMatin = new Date('2024-01-05T10:00:00'); // Vendredi 5 janvier 2024, 10:00
      const nextFriday = getNextFriday(vendrediMatin);
      
      expect(nextFriday.getFullYear()).toBe(2024);
      expect(nextFriday.getMonth()).toBe(0); // Janvier
      expect(nextFriday.getDate()).toBe(5); // Même jour
      expect(nextFriday.getHours()).toBe(12);
      expect(nextFriday.getMinutes()).toBe(0);
      expect(nextFriday.getSeconds()).toBe(0);
    });

    it('should return next week friday if vendredi after 12:00', () => {
      const vendrediApresMidi = new Date('2024-01-05T15:00:00'); // Vendredi 5 janvier 2024, 15:00
      const nextFriday = getNextFriday(vendrediApresMidi);
      
      expect(nextFriday.getFullYear()).toBe(2024);
      expect(nextFriday.getMonth()).toBe(0); // Janvier
      expect(nextFriday.getDate()).toBe(12); // Vendredi suivant
      expect(nextFriday.getHours()).toBe(12);
      expect(nextFriday.getMinutes()).toBe(0);
      expect(nextFriday.getSeconds()).toBe(0);
    });

    it('should return correct friday from lundi', () => {
      const lundi = new Date('2024-01-08T14:00:00'); // Lundi 8 janvier 2024, 14:00
      const nextFriday = getNextFriday(lundi);
      
      expect(nextFriday.getFullYear()).toBe(2024);
      expect(nextFriday.getMonth()).toBe(0); // Janvier
      expect(nextFriday.getDate()).toBe(12); // Vendredi de la même semaine
      expect(nextFriday.getHours()).toBe(12);
    });

    it('should return correct friday from samedi', () => {
      const samedi = new Date('2024-01-06T16:00:00'); // Samedi 6 janvier 2024, 16:00
      const nextFriday = getNextFriday(samedi);
      
      expect(nextFriday.getFullYear()).toBe(2024);
      expect(nextFriday.getMonth()).toBe(0); // Janvier
      expect(nextFriday.getDate()).toBe(12); // Vendredi suivant
      expect(nextFriday.getHours()).toBe(12);
    });

    it('should return correct friday from dimanche', () => {
      const dimanche = new Date('2024-01-07T20:00:00'); // Dimanche 7 janvier 2024, 20:00
      const nextFriday = getNextFriday(dimanche);
      
      expect(nextFriday.getFullYear()).toBe(2024);
      expect(nextFriday.getMonth()).toBe(0); // Janvier
      expect(nextFriday.getDate()).toBe(12); // Vendredi suivant
      expect(nextFriday.getHours()).toBe(12);
    });
  });

  describe('getWeekendEnd', () => {
    it('should return correct lundi from vendredi après 12:00', () => {
      const vendrediApresMidi = new Date('2024-01-05T15:00:00'); // Vendredi 5 janvier 2024, 15:00
      const weekendEnd = getWeekendEnd(vendrediApresMidi);
      
      expect(weekendEnd.getFullYear()).toBe(2024);
      expect(weekendEnd.getMonth()).toBe(0); // Janvier
      expect(weekendEnd.getDate()).toBe(8); // Lundi suivant
      expect(weekendEnd.getHours()).toBe(0);
      expect(weekendEnd.getMinutes()).toBe(0);
      expect(weekendEnd.getSeconds()).toBe(0);
    });

    it('should return correct lundi from samedi', () => {
      const samedi = new Date('2024-01-06T16:00:00'); // Samedi 6 janvier 2024, 16:00
      const weekendEnd = getWeekendEnd(samedi);
      
      expect(weekendEnd.getDate()).toBe(8); // Lundi suivant
      expect(weekendEnd.getHours()).toBe(0);
    });

    it('should return correct lundi from dimanche', () => {
      const dimanche = new Date('2024-01-07T20:00:00'); // Dimanche 7 janvier 2024, 20:00
      const weekendEnd = getWeekendEnd(dimanche);
      
      expect(weekendEnd.getDate()).toBe(8); // Lundi suivant
      expect(weekendEnd.getHours()).toBe(0);
    });
  });

  describe('getTimeRemaining', () => {
    it('should calculate correct time difference', () => {
      const from = new Date('2024-01-01T12:00:00');
      const to = new Date('2024-01-02T14:30:45');
      
      const remaining = getTimeRemaining(from, to);
      
      expect(remaining.days).toBe(1);
      expect(remaining.hours).toBe(2);
      expect(remaining.minutes).toBe(30);
      expect(remaining.seconds).toBe(45);
    });

    it('should return zeros if target time is in the past', () => {
      const from = new Date('2024-01-02T12:00:00');
      const to = new Date('2024-01-01T12:00:00');
      
      const remaining = getTimeRemaining(from, to);
      
      expect(remaining.days).toBe(0);
      expect(remaining.hours).toBe(0);
      expect(remaining.minutes).toBe(0);
      expect(remaining.seconds).toBe(0);
    });

    it('should calculate remaining hours and minutes correctly', () => {
      const from = new Date('2024-01-01T10:15:30');
      const to = new Date('2024-01-01T13:45:15');
      
      const remaining = getTimeRemaining(from, to);
      
      expect(remaining.days).toBe(0);
      expect(remaining.hours).toBe(3);
      expect(remaining.minutes).toBe(29);
      expect(remaining.seconds).toBe(45);
    });
  });

  describe('formatTimeRemaining', () => {
    it('should format time with days correctly', () => {
      const time = { days: 2, hours: 14, minutes: 30, seconds: 45 };
      const formatted = formatTimeRemaining(time);
      
      expect(formatted).toBe('02 jours 14:30:45');
    });

    it('should format time with single day correctly', () => {
      const time = { days: 1, hours: 8, minutes: 5, seconds: 0 };
      const formatted = formatTimeRemaining(time);
      
      expect(formatted).toBe('01 jour 08:05:00');
    });

    it('should format time without days correctly', () => {
      const time = { days: 0, hours: 3, minutes: 45, seconds: 30 };
      const formatted = formatTimeRemaining(time);
      
      expect(formatted).toBe('03:45:30');
    });

    it('should pad single digits with zeros', () => {
      const time = { days: 0, hours: 1, minutes: 2, seconds: 3 };
      const formatted = formatTimeRemaining(time);
      
      expect(formatted).toBe('01:02:03');
    });

    it('should handle zero time correctly', () => {
      const time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      const formatted = formatTimeRemaining(time);
      
      expect(formatted).toBe('00:00:00');
    });
  });
});