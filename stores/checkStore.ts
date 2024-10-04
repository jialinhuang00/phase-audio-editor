import { proxy } from "valtio";

export type Item = {
  text: string;
  checked: boolean;
};

export type SectionKey =
  | "numberInput"
  | "playControls"
  | "ruler"
  | "trackList"
  | "keyframeList"
  | "playhead";

export type Overall = {
  [key in SectionKey]: { items: Item[]; isOpen: boolean };
};

export const checkStore = proxy<{ sections: Overall }>({
  sections: {
    numberInput: {
      isOpen: true,
      items: [
        {
          text: "The displayed value updates immediately while typing, but onChange is not triggered until input is confirmed",
          checked: false,
        },
        {
          text: "Clicking outside the input field removes focus and changes the value",
          checked: false,
        },
        {
          text: "Clicking on the native step buttons immediately changes the value (🔼🔽)",
          checked: false,
        },
        {
          text: "Pressing up arrow or down arrow keys immediately changes the value (⬆️⬇️)",
          checked: false,
        },
        {
          text: "Entire text is selected when the input field gains focus",
          checked: false,
        },
        {
          text: "Entire text is selected after using the native step buttons",
          checked: false,
        },
        {
          text: "Entire text is selected after using the up arrow or down arrow keys",
          checked: false,
        },
        {
          text: "Pressing Enter confirms the new value and removes focus",
          checked: false,
        },
        {
          text: "Pressing Escape reverts to the original value and removes focus",
          checked: false,
        },
        { text: "Leading zeros are automatically removed", checked: false },
        {
          text: "Negative values are automatically adjusted to the minimum allowed value",
          checked: false,
        },
        {
          text: "Decimal values are automatically rounded to the nearest integer",
          checked: false,
        },
        {
          text: "Invalid inputs (non-numeric) revert to the previous valid value (🤯 not sure if I did it right)",
          checked: false,
        },
      ],
    },
    playControls: {
      isOpen: true,
      items: [
        {
          text: "Current Time is always between 0ms and the Duration",
          checked: false,
        },
        {
          text: "Current Time adjusts if it exceeds the newly set Duration",
          checked: false,
        },
        { text: "Duration is always between 100ms and 6000ms", checked: false },
        {
          text: "Current Time and Duration are always multiples of 10ms",
          checked: false,
        },
        {
          text: "Current Time and Duration are always positive integers",
          checked: false,
        },
        {
          text: "Playhead position updates only after specific actions on Current Time input",
          checked: false,
        },
      ],
    },
    ruler: {
      isOpen: true,
      items: [
        {
          text: "Clicking or dragging on the Ruler updates the Current Time and Playhead position",
          checked: false,
        },
        {
          text: "Horizontal scrolling of the Ruler is synchronized with the Keyframe List",
          checked: false,
        },
        {
          text: "Ruler length visually represents the total Duration (1ms = 1px)",
          checked: false,
        },
        {
          text: "Ruler length updates only after specific actions on Duration input",
          checked: false,
        },
      ],
    },
    trackList: {
      isOpen: true,
      items: [
        {
          text: "Vertical scrolling of the Track List is synchronized with the Keyframe List",
          checked: false,
        },
      ],
    },
    keyframeList: {
      isOpen: true,
      items: [
        {
          text: "Vertical scrolling is synchronized with the Track List",
          checked: false,
        },
        {
          text: "Horizontal scrolling is synchronized with the Ruler",
          checked: false,
        },
        {
          text: "Segment length visually represents the total Duration (1ms = 1px)",
          checked: false,
        },
        {
          text: "Segment length updates only after specific actions on Duration input",
          checked: false,
        },
      ],
    },
    playhead: {
      isOpen: true,
      items: [
        {
          text: "Playhead moves in sync with the Ruler and Keyframe List during horizontal scrolling",
          checked: false,
        },
        {
          text: "Playhead maintains its relative position during horizontal scrolling",
          checked: false,
        },
        {
          text: "Playhead is visible only when within the Timeline's visible area",
          checked: false,
        },
      ],
    },
  },
});
