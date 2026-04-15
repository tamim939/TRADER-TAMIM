import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const WELCOME_SEEN_KEY = 'signal-welcome-seen';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(WELCOME_SEEN_KEY)) {
      setIsOpen(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === '✅') {
      localStorage.setItem(WELCOME_SEEN_KEY, '1');
      setIsOpen(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card border border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">⚡ সিগন্যাল সিস্টেমে স্বাগতম</h2>
                <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-center">
                <p>
                  সরাসরি স্ক্রিনে <span className="font-semibold text-primary">রিয়েল-টাইম সিগন্যাল</span> পেতে নিচের পাসওয়ার্ডটি ব্যবহার করে লগইন করুন।
                </p>
                
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <p className="text-xs font-medium mb-2">লগইন পাসওয়ার্ড:</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="bg-muted px-3 py-1 rounded font-bold text-foreground">✅</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="পাসওয়ার্ড দিন"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-background text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all",
                      error ? "border-destructive ring-2 ring-destructive" : "border-border"
                    )}
                  />
                  {error && <p className="text-destructive text-xs animate-shake">ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।</p>}
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                লগইন করুন
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
