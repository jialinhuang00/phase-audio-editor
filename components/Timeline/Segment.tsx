import { audioStore } from "@/stores/audioStore";
import { useSnapshot } from "valtio";

type SegmentProps = {
  duration: number;
  color: string;
  track: string;
};

export const Segment = ({ duration, color, track }: SegmentProps) => {
  const { positions, selectTrack } = useSnapshot(audioStore);
  const isSelected = selectTrack === track;
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
        {positions.map((left, index) => {
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
        })}
      </div>
    </div>
  );
};
