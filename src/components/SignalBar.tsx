import React from 'react';
import { cn } from '@/src/lib/utils';

interface SignalBarProps {
  signal: string;
  period: string;
  currentPeriod: string;
  secondsLeft: number;
}

export const SignalBar: React.FC<SignalBarProps> = ({
  signal,
  period,
  currentPeriod,
  secondsLeft,
}) => {
  const isActive = signal && period && period === currentPeriod;
  const progress = ((30 - secondsLeft) / 30) * 100;

  return (
    <div className="relative flex items-center gap-2 px-3 py-1.5 bg-card border-b border-border text-xs">
      <span className="text-muted-foreground shrink-0">P:</span>
      <span className="font-mono font-semibold text-foreground truncate max-w-[120px]">
        {currentPeriod?.slice(-6) || "..."}
      </span>
      
      <div className="relative shrink-0 w-7 h-7">
        <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
          <circle
            cx="14"
            cy="14"
            r="11"
            fill="none"
            strokeWidth="2.5"
            className="stroke-muted"
          />
          <circle
            cx="14"
            cy="14"
            r="11"
            fill="none"
            strokeWidth="2.5"
            className="stroke-primary transition-all duration-1000"
            strokeDasharray={`${2 * Math.PI * 11}`}
            strokeDashoffset={`${2 * Math.PI * 11 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[10px] text-foreground">
          {secondsLeft}
        </span>
      </div>

      <div className="flex-1" />

      {isActive ? (
        <div className="relative flex items-center">
          <div 
            className={cn(
              "absolute -inset-1.5 rounded-full blur-md opacity-70 animate-pulse",
              signal === "BIG" ? "bg-signal-big" : "bg-signal-small"
            )} 
          />
          <div 
            className={cn(
              "relative px-3 py-1 rounded-full font-extrabold text-[13px] uppercase tracking-widest shadow-lg ring-2 ring-offset-1 ring-offset-background animate-signal-pop animate-signal-glow",
              signal === "BIG" ? "bg-signal-big text-white ring-signal-big" : "bg-signal-small text-white ring-signal-small"
            )}
          >
            {signal === "BIG" ? "🔴" : "🟢"} {signal}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground text-[10px]">Waiting for signal...</span>
      )}
    </div>
  );
};
