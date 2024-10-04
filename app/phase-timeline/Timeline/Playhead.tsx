"use client";
import { scrollStore } from "@/app/stores/scrollStore";
import { useCallback, useEffect, useState } from "react";
import { useSnapshot } from "valtio";

type PlayheadProps = {
  time: number;
  duration: number;
};

export const Playhead: React.FC<
  PlayheadProps & { onDrag: (time: number) => void }
> = ({ time, duration, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { scrollX } = useSnapshot(scrollStore);
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        const rect = event.currentTarget.getBoundingClientRect();
        const newTime = Math.min(
          Math.max(event.clientX - rect.left, 0),
          duration
        );
        onDrag(newTime);
      }
    },
    [isDragging, duration, onDrag]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const translatedTime = time - scrollX;
  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{
        transform: `translateX(calc(${translatedTime}px - 50%))`,
        visibility: translatedTime < -16 ? "hidden" : "visible",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
