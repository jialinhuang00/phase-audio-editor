"use client";
import { useScrollY } from "@/hooks/useScrollY";
import { useEffect, useRef } from "react";

export const TrackList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollY(listRef);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  return (
    <div
      ref={listRef}
      className="grid grid-flow-row auto-rows-[40px]
      border-r border-solid border-r-gray-700 text-white 
      overflow-auto"
      data-testid="track-list"
    >
      <div className="p-2">
        <div>Track A</div>
      </div>
      <div className="p-2">
        <div>Track B</div>
      </div>
      <div className="p-2">
        <div>Track C</div>
      </div>
      <div className="p-2">
        <div>Track D</div>
      </div>
      <div className="p-2">
        <div>Track E</div>
      </div>
      <div className="p-2">
        <div>Track F </div>
      </div>
      <div className="p-2">
        <div>Track G</div>
      </div>
      <div className="p-2">
        <div>Track H</div>
      </div>
      <div className="p-2">
        <div>Track I </div>
      </div>
      <div className="p-2">
        <div>Track J</div>
      </div>
    </div>
  );
};
