"use client";
import { useCallback, useState } from "react";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";

export const Timeline = () => {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(800);
  const handleTimeUpdate = (time: number) => {
    setTime(time);
  };

  const handlePlayheadDrag = useCallback(
    (newTime: number) => {
      console.log(newTime);
      const clampedTime = Math.min(Math.max(newTime, 0), duration);
      setTime(clampedTime);
    },
    [duration, handleTimeUpdate]
  );

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_calc(100vw-300px)] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700 overflow-hidden"
      data-testid="timeline"
    >
      <PlayControls
        time={time}
        setTime={setTime}
        duration={duration}
        setDuration={setDuration}
      />
      <Ruler duration={duration} onTimeUpdate={handleTimeUpdate} />
      <TrackList />
      <KeyframeList duration={duration} />
      <Playhead time={time} duration={duration} onDrag={handlePlayheadDrag} />
    </div>
  );
};
