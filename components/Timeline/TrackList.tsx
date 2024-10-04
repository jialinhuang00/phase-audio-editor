"use client";
import { useScrollY } from "@/hooks/useScrollY";
import { audioStore, PALETTES } from "@/stores/audioStore";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

export const TrackList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollY(listRef);
  const { tracks, selectTrack } = useSnapshot(audioStore);

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
      {tracks.map((track, index) => (
        <div
          onClick={() => (audioStore.selectTrack = track)}
          className={`cursor-pointer my-2 pl-2 pr-0 flex justify-between items-center ${
            selectTrack === track ? "bg-white/30" : ""
          }`}
          style={{ color: PALETTES[index % PALETTES.length] }}
          key={`${track}_${index}`}
        >
          <div>Track {track}</div>
          <div>
            <svg
              width={16}
              height={16}
              fill="white"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M15.5 7.5v1H.5v-1z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
