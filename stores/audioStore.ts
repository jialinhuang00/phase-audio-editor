import { proxy } from "valtio";

export const audioStore = proxy({
  scrollX: 0,
  scrollY: 0,
  time: 0,
  duration: 1700,
  selectTrack: "",
  tracks: Array.from({ length: 20 }, (_, index) =>
    String.fromCharCode(65 + index)
  ),
  get positions() {
    return Array.from(
      { length: Math.floor((this.duration + 100) / 100) },
      (_, index) => index * 100
    );
  },
});

export function roundToNearestTen(num: number) {
  return Math.round(num / 10) * 10;
}

export const PALETTES = [
  "#9f58e0",
  "#17b3fb",
  "#f48f27",
  "#fc44b2",
  "#dcdc24",
  "#1aea9d",
  "#fafafa",
];
