import { useState, useEffect, useRef } from 'react';

const fetchPeriod = async (): Promise<string> => {
  try {
    const response = await fetch('https://uojitexpkhexpbuqujxy.supabase.co/functions/v1/get-period', {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaml0ZXhwa2hleHBidXF1anh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY4MzQsImV4cCI6MjA4ODg5MjgzNH0.Srmcs-ho-kq35-HSWF2C6Ua1zVNel_HFS9uu2KcBJ2o'
      }
    });
    const data = await response.json();
    if (data.status === 'success') return data.period;
  } catch (error) {
    console.error('Error fetching period:', error);
  }
  return '';
};

export const useCountdown = (onPeriodChange?: (newPeriod: string) => void) => {
  const [period, setPeriod] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(30);
  const lastPeriodRef = useRef('');

  useEffect(() => {
    let active = true;

    const updatePeriod = async () => {
      const newPeriod = await fetchPeriod();
      if (newPeriod && active) {
        if (newPeriod !== lastPeriodRef.current) {
          if (lastPeriodRef.current) {
            onPeriodChange?.(lastPeriodRef.current);
          }
          lastPeriodRef.current = newPeriod;
        }
        setPeriod(newPeriod);
      }
    };

    updatePeriod();
    const periodInterval = window.setInterval(updatePeriod, 5000);

    const countdownInterval = window.setInterval(() => {
      if (!active) return;
      
      const now = new Date();
      const seconds = now.getUTCSeconds();
      const ms = now.getUTCMilliseconds();
      
      // Based on the screenshot, the app was 3 seconds ahead of the game.
      // App: 16s, Game: 13s.
      // To sync, we need to make the app's 'remaining' time smaller.
      // This means we need to increase 'elapsedInCycle'.
      // Let's try a more precise offset.
      const elapsedInCycle = (seconds % 30) * 1000 + ms + 3500; 
      const remaining = Math.max(0, 30 - Math.floor(elapsedInCycle / 1000));
      
      if (remaining === 30 && secondsLeft === 1) {
        if (lastPeriodRef.current) {
          onPeriodChange?.(lastPeriodRef.current);
        }
      }
      
      setSecondsLeft(remaining === 0 ? 30 : remaining);
    }, 1000);

    return () => {
      active = false;
      window.clearInterval(periodInterval);
      window.clearInterval(countdownInterval);
    };
  }, []);

  return { period, secondsLeft };
};
