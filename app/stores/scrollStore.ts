import { proxy } from "valtio";

export const scrollStore = proxy({
  scrollX: 0,
  scrollY: 0,
});
