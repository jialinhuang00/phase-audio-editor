"use client";
import { useEffect, useRef } from "react";
import { Segment } from "@/components/Timeline/Segment";
import { useScrollX } from "@/hooks/useScrollX";
import { useScrollY } from "@/hooks/useScrollY";
import { audioStore, PALETTES } from "@/stores/audioStore";
import { useSnapshot } from "valtio";

export const KeyframeList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollX = useScrollX(listRef);
  const scrollY = useScrollY(listRef);
  const { tracks, duration, selectTrack } = useSnapshot(audioStore);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  return (
    <div
      ref={listRef}
      className="px-4 min-w-0 overflow-auto"
      data-testid="keyframe-list"
    >
      {tracks.map((track, index) => (
        <Segment
          track={track}
          color={PALETTES[index % PALETTES.length]}
          duration={duration}
          key={`${track}_${index}`}
        />
      ))}
    </div>
  );
};
