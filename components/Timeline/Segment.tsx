"use client";
import { audioStore } from "@/stores/audioStore";
import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";

type SegmentProps = {
  duration: number;
  color: string;
  track: string;
};

const generateBars = (width: number, maxHeight: number) => {
  const bars = [];
  let prevHeight = maxHeight / 2;

  for (let x = 0; x < width; x += 2) {
    // Generate a new height that's somewhat related to the previous height
    const newHeight = Math.max(
      1,
      Math.min(maxHeight, prevHeight + (Math.random() - 0.5) * 8)
    );
    bars.push({ x, height: newHeight });
    prevHeight = newHeight;
  }

  return bars;
};

export const Segment = ({ duration, color, track }: SegmentProps) => {
  const { positions, selectTrack } = useSnapshot(audioStore);
  const isSelected = selectTrack === track;
  const bars = useMemo(() => generateBars(duration, 22), [duration]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // prevent accumulation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    ctx.fillStyle = color;
    bars.forEach((bar) => {
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bar.x, (24 - bar.height) / 2, 1, bar.height);
    });

    // Draw position markers
    positions.forEach((left, index) => {
      const isFiveMultiple = index % 5 === 0;
      ctx.globalAlpha = isFiveMultiple ? 1 : 0.4;
      ctx.fillRect(
        left + (isFiveMultiple ? -1.5 : 0),
        0,
        isFiveMultiple ? 3 : 1,
        24
      );
    });
  }, [bars, color, positions]);

  return (
    <div
      className="py-2"
      data-testid="segment"
      style={{ width: `${duration}px` }}
    >
      <div
        className={`relative h-6 rounded-md flex items-center ${
          isSelected ? "bg-white/30" : "bg-white/10"
        }`}
      >
        {/* {positions.map((left, index) => {
          const isFiveMultiple = index % 5 === 0;
          return index === 0 ? null : (
            <div
              key={left}
              className="absolute ml-[-0.5px] text-[7px] text-[#777] w-[1px] h-full"
              style={{
                left: `${left}px`,
                width: isFiveMultiple ? 3 : 1,
                marginLeft: isFiveMultiple ? -1.5 : -0.5,
                background: color,
                opacity: isFiveMultiple ? 1 : 0.4,
              }}
            ></div>
          );
        })} */}
        <canvas
          ref={canvasRef}
          width={duration}
          height={24}
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
};
