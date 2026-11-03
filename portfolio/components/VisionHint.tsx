"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Goal } from "lucide-react";

const STORAGE_KEY = "vision-hint-seen-at";
// Show the hint again after this many days. Set to null to show it only once, ever.
const REPEAT_AFTER_DAYS: number | null = 30;
const SHOW_DELAY_MS = 800; 
const SHOW_DURATION_MS = 5000;

function shouldShowHint(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true; // first visit, or storage was cleared
    if (REPEAT_AFTER_DAYS === null) return false;
    const seenAt = Number(raw);
    if (!Number.isFinite(seenAt)) return true;
    return Date.now() - seenAt > REPEAT_AFTER_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    // Storage blocked (private mode, etc.): don't nag on every load
    return false;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

interface VisionHintButtonProps {
  isActive: boolean;
  onSelect: () => void;
}

export function VisionHintButton({ isActive, onSelect }: VisionHintButtonProps) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!shouldShowHint()) return;

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showTimer = setTimeout(() => {
      
      const el = buttonRef.current;
      if (!el || el.getClientRects().length === 0) return;

      setVisible(true);
      markSeen();
      hideTimer = setTimeout(() => setVisible(false), SHOW_DURATION_MS);
    }, SHOW_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = useCallback(() => {
    setVisible(false);
    markSeen();
    onSelect();
  }, [onSelect]);

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-label="Vision"
        title="My Vision"
        aria-describedby={visible ? "vision-hint" : undefined}
        aria-current={isActive ? "page" : undefined}
        className={`relative rounded-lg border p-2.5 transition-colors duration-200 ${
          visible
            ? "border-[#ff7d00]/60 text-foreground"
            : isActive
              ? "border-transparent bg-white/10 text-foreground"
              : "border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
        }`}
      >
        {visible && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg border border-gray-500 animate-ping motion-reduce:animate-none"
          />
        )}
        <Goal className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            id="vision-hint"
            role="tooltip"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-lg border border-gray-500/40 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-lg"
          >
            My Vision
            <span
              aria-hidden
              className="absolute -top-1 right-5 h-2 w-2 rotate-45 border-l border-t border-gray-500/40 bg-card"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}