type RulerProps = {
  duration: number;
};

export const Ruler = ({ duration }: RulerProps) => {
  return (
    <div
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
    >
      <div
        className="h-6 rounded-md bg-white/25"
        data-testid="ruler-bar"
        style={{ width: `${duration}px` }}
      ></div>
    </div>
  );
};
