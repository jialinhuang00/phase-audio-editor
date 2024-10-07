"use client";
import { audioStore, roundToNearestTen } from "@/stores/audioStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

const LEFT_OFFSET = 316;
export const Playhead = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { scrollX, duration, time } = useSnapshot(audioStore);
  const lastUpdateRef = useRef(0);

  const updatingPosition = useCallback(
    (newValue: number) => {
      const clampedTime = Math.min(Math.max(newValue, 0), duration);
      audioStore.time = clampedTime;
    },
    [duration]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    // prevent selecting text LOL
    e.preventDefault();
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const now = Date.now();

        // 16 means 60fps
        if (now - lastUpdateRef.current > 16) {
          const mouseX = e.clientX + scrollX; // Add scrollX to account for horizontal scroll
          const newPosition = Math.max(
            LEFT_OFFSET,
            Math.min(mouseX, LEFT_OFFSET + duration)
          );
          updatingPosition(roundToNearestTen(newPosition - LEFT_OFFSET));
          lastUpdateRef.current = now;
        }
      }
    },
    [isDragging, duration, scrollX, updatingPosition]
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
      className="absolute  h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{
        left: `${LEFT_OFFSET}px`,
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
