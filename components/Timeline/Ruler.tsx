"use client";

import { useScrollX } from "@/hooks/useScrollX";
import { audioStore, roundToNearestTen } from "@/stores/audioStore";
import { useRef, useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";

const PADDING_X = 16;
export const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const scrollX = useScrollX(rulerRef);
  const { duration, positions } = useSnapshot(audioStore);

  const handleRulerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (rulerRef.current) {
        const rect = rulerRef.current.getBoundingClientRect();
        const scrollLeft = rulerRef.current.scrollLeft;
        // padding counts as part of width, need to offset
        const clickPosition =
          event.clientX - rect.left + scrollLeft - PADDING_X;
        const newTime = Math.min(Math.max(clickPosition, 0), duration);
        audioStore.time = roundToNearestTen(newTime);
      }
    },
    [duration]
  );

  useEffect(() => {
    if (rulerRef.current) {
      rulerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <div
      ref={rulerRef}
      className="cursor-pointer overflow-auto relative py-2 min-w-0 border-b border-solid border-gray-700 overflow-x-auto overflow-y-hidden"
      style={{ paddingLeft: PADDING_X, paddingRight: PADDING_X }}
      data-testid="ruler"
    >
      <div
        onClick={handleRulerClick}
        className="h-6 rounded-md bg-white/25"
        data-testid="ruler-bar"
        style={{ width: `${duration}px` }}
      >
        {positions.map((left, index) => {
          const isFiveMultiple = index % 5 === 0 && index;
          return !isFiveMultiple ? null : (
            <div
              key={left}
              className="absolute flex flex-col justify-between text-center ml-[-0.5px] text-[7px] h-7 text-[#fafafa] w-[1px]"
              style={{
                left: `${left + 0.75}px`,
                width: 30,
              }}
            >
              <p> {left}</p>
              <p>|</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
