'use client';

import { useState, useEffect } from 'react';
import { isWeekend, getNextFriday, getWeekendEnd, getTimeRemaining, formatTimeRemaining } from '@/lib/weekend';

export default function WeekendWidget() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isCurrentlyWeekend = isWeekend(currentTime);

  const getDisplayContent = () => {
    if (isCurrentlyWeekend) {
      const weekendEnd = getWeekendEnd(currentTime);
      const timeRemaining = getTimeRemaining(currentTime, weekendEnd);
      const formattedTime = formatTimeRemaining(timeRemaining);
      
      return {
        status: 'OUI',
        emoji: '🎉',
        message: 'Temps restant du week-end',
        countdown: formattedTime,
        bgColor: 'from-green-400 to-emerald-500',
        textColor: 'text-white'
      };
    } else {
      const nextFriday = getNextFriday(currentTime);
      const timeRemaining = getTimeRemaining(currentTime, nextFriday);
      const formattedTime = formatTimeRemaining(timeRemaining);
      
      return {
        status: 'PAS ENCORE',
        emoji: '⏰',
        message: 'Prochain vendredi 12:00 dans',
        countdown: formattedTime,
        bgColor: 'from-orange-400 to-red-500',
        textColor: 'text-white'
      };
    }
  };

  const { status, emoji, message, countdown, bgColor, textColor } = getDisplayContent();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className={`bg-gradient-to-br ${bgColor} rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-2xl w-full transform hover:scale-105 transition-transform duration-300`}>
        <div className={`${textColor} space-y-6`}>
          <h1 className="text-2xl md:text-3xl font-bold mb-8">
            C&apos;est bientôt le week-end ?
          </h1>
          
          <div className="space-y-4">
            <div className="text-6xl md:text-8xl font-black tracking-wider">
              {status}
            </div>
            
            <div className="text-4xl md:text-6xl" role="img" aria-label={status === 'OUI' ? 'Célébration' : 'Attente'}>
              {emoji}
            </div>
          </div>
          
          <div className="space-y-3 pt-6">
            <p className="text-lg md:text-xl font-medium opacity-90">
              {message} :
            </p>
            
            <div 
              className="text-2xl md:text-3xl font-mono bg-black/20 rounded-xl py-4 px-6 backdrop-blur-sm"
              role="timer"
              aria-live="polite"
              aria-label={`${message} ${countdown}`}
            >
              {countdown}
            </div>
          </div>
          
          <div className="text-sm md:text-base opacity-75 pt-4">
            Mis à jour toutes les secondes
          </div>
        </div>
      </div>
    </main>
  );
}