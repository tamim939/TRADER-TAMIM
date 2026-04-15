import React, { useState } from 'react';
import { SignalBar } from './SignalBar';
import { WelcomeModal } from './WelcomeModal';
import { ResultOverlay } from './ResultOverlay';
import { useSignals } from '@/src/hooks/useSignals';
import { useCountdown } from '@/src/hooks/useCountdown';
import { useHeartbeat } from '@/src/hooks/useHeartbeat';
import { cn } from '@/src/lib/utils';

export const UserPanel: React.FC = () => {
  const { signal, period } = useSignals();
  const { period: currentPeriod, secondsLeft } = useCountdown();
  const [currentUrl, setCurrentUrl] = useState('https://22bdwin24.com/');
  
  useHeartbeat();

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      <WelcomeModal />
      <div className="z-10 relative">
        <SignalBar 
          signal={signal} 
          period={period} 
          currentPeriod={currentPeriod} 
          secondsLeft={secondsLeft} 
        />
        <div className="flex gap-2 p-2 bg-card border-b border-border">
          <button
            onClick={() => setCurrentUrl('https://22bdwin24.com/')}
            className={cn(
              "flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all",
              currentUrl === 'https://22bdwin24.com/' 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            22BDWin24
          </button>
          <button
            onClick={() => setCurrentUrl('https://dkwin7.com/')}
            className={cn(
              "flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all",
              currentUrl === 'https://dkwin7.com/' 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            DKWin7
          </button>
        </div>
      </div>
      <iframe
        src={currentUrl}
        className="flex-1 w-full border-none bg-white relative z-0"
        title="Game View"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
      />
    </div>
  );
};
