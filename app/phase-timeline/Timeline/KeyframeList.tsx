import { Segment } from "./Segment";

type KeyframeListProps = {
  duration: number;
};
export const KeyframeList = ({ duration }: KeyframeListProps) => {
  return (
    <div className="px-4 min-w-0 overflow-auto" data-testid="keyframe-list">
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
