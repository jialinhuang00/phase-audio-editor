"use client";

import { useScrollX } from "@/app/hooks/useScrollX";
import { useRef, useCallback, useEffect } from "react";

type RulerProps = {
  duration: number;
  onTimeUpdate: (time: number) => void;
};

const PADDING_X = 16;
export const Ruler: React.FC<RulerProps> = ({ duration, onTimeUpdate }) => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const scrollX = useScrollX(rulerRef);

  const handleRulerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (rulerRef.current) {
        const rect = rulerRef.current.getBoundingClientRect();
        const scrollLeft = rulerRef.current.scrollLeft;
        // padding counts as part of width, need to offset
        const clickPosition =
          event.clientX - rect.left + scrollLeft - PADDING_X;
        const newTime = Math.min(Math.max(clickPosition, 0), duration);
        onTimeUpdate(newTime);
      }
    },
    [duration, onTimeUpdate]
  );

  useEffect(() => {
    if (rulerRef.current) {
      rulerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <div
      ref={rulerRef}
      className="overflow-auto relative py-2 min-w-0 border-b border-solid border-gray-700 overflow-x-auto overflow-y-hidden"
      style={{ padding: `0 ${PADDING_X}px` }}
      data-testid="ruler"
    >
      <div
        onClick={handleRulerClick}
        className="h-6 rounded-md bg-white/25"
        data-testid="ruler-bar"
        style={{ width: `${duration}px` }}
      ></div>
    </div>
  );
};
