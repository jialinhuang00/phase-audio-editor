"use client";
import { Playhead } from "@/components/Timeline/Playhead";
import { Ruler } from "@/components/Timeline/Ruler";
import { TrackList } from "@/components/Timeline/TrackList";
import { KeyframeList } from "@/components/Timeline/KeyframeList";
import { PlayControls } from "@/components/Timeline/PlayControls";

export const Timeline = () => {
  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[minmax(150px,_300px)_minmax(600px,_1fr)] grid-rows-[40px_1fr] 
    bg-[#222222] border-t-2 border-solid border-gray-700 overflow-hidden"
      data-testid="timeline"
    >
      <PlayControls />
      <Ruler />
      <TrackList />
      <KeyframeList />
      <Playhead />
    </div>
  );
};
