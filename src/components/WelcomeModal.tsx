import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const WELCOME_SEEN_KEY = 'signal-welcome-seen';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(WELCOME_SEEN_KEY)) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(WELCOME_SEEN_KEY, '1');
    setIsOpen(false);
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
                <h2 className="text-2xl font-bold text-foreground">⚡ স্বাগতম — সিগন্যাল সিস্টেম</h2>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  এই সিস্টেমটি তৈরি করা হয়েছে যাতে আপনি <span className="font-semibold text-foreground">রিয়েল-টাইমে সিগন্যাল</span> পেতে পারেন — কোনো দেরি ছাড়াই।
                </p>

                <div className="rounded-xl bg-muted/50 p-4 space-y-2 border border-border">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    সমস্যা কী ছিল?
                  </p>
                  <p>
                    টেলিগ্রাম লাইভে অনেক পার্টিসিপেন্ট থাকায় সিগন্যাল <span className="font-semibold text-destructive">১০–১৫ সেকেন্ড লেটে</span> শোনা যেত। আবার সবাই আনমিউট থাকলে গোলমাল হতো, তাই মিউট রাখতে হতো — যার ফলে সিগন্যাল আরও দেরিতে পৌঁছাতো।
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4 space-y-2 border border-border">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    এখন কী হবে?
                  </p>
                  <p>
                    এই সিস্টেমে সিগন্যাল <span className="font-semibold text-primary">সেকেন্ডের মধ্যে</span> সরাসরি আপনার স্ক্রিনে চলে আসবে। মার্কেট প্রতি ৩০ সেকেন্ডে পরিবর্তন হয় — তাই দ্রুত সিগন্যাল পাওয়া অত্যন্ত গুরুত্বপূর্ণ।
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 p-4 space-y-2 border border-primary/20">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wider">📌 কিভাবে ব্যবহার করবেন?</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>স্ক্রিনের উপরে সিগন্যাল বার দেখুন — <span className="font-bold text-destructive">🔴 BIG</span> অথবা <span className="font-bold text-green-500">🟢 SMALL</span></li>
                    <li>সিগন্যাল আসলে ফোন ভাইব্রেট করবে</li>
                    <li>কাউন্টডাউন টাইমার দেখে সময় বুঝুন</li>
                    <li>সিগন্যাল অনুযায়ী দ্রুত অ্যাকশন নিন</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                ✅ বুঝেছি
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
