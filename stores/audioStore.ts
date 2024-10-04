import { proxy } from "valtio";

export const audioStore = proxy({
  scrollX: 0,
  scrollY: 0,
  tracks: Array.from({ length: 10 }, (_, index) =>
    String.fromCharCode(65 + index)
  ),
});

export function roundToNearestTen(num: number) {
  return Math.round(num / 10) * 10;
}
