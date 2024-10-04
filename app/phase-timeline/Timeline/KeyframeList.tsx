"use client";
import { useEffect, useRef } from "react";
import { Segment } from "@/app/phase-timeline/Timeline/Segment";
import { useScrollX } from "@/hooks/useScrollX";
import { useScrollY } from "@/hooks/useScrollY";

type KeyframeListProps = {
  duration: number;
};

export const KeyframeList = ({ duration }: KeyframeListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollX = useScrollX(listRef);
  const scrollY = useScrollY(listRef);

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
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
      <Segment duration={duration} />
    </div>
  );
};
