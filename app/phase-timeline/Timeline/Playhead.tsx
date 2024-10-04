"use client";
import { audioStore, roundToNearestTen } from "@/stores/audioStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

type PlayheadProps = {
  time: number;
  duration: number;
};

export const Playhead: React.FC<
  PlayheadProps & { onDrag: (time: number) => void }
> = ({ time, duration, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { scrollX } = useSnapshot(audioStore);
  const lastUpdateRef = useRef(0);
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    // prevent selecting text LOL
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const now = Date.now();
        // lower frequency test
        if (now - lastUpdateRef.current > 16) {
          const newPosition = Math.max(0, Math.min(e.clientX, duration + 316));
          onDrag(roundToNearestTen(newPosition - 316));
          lastUpdateRef.current = now;
        }
      }
    },
    [isDragging, duration, onDrag]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, handleMouseUp, handleMouseMove]);
  const translatedTime = time - scrollX;
  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{
        cursor: "ew-resize",
        transform: `translateX(calc(${translatedTime}px - 50%))`,
        visibility: translatedTime < -16 ? "hidden" : "visible",
      }}
      onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
