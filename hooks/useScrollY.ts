import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { audioStore } from "@/stores/audioStore";

export const useScrollY = (ref: React.RefObject<HTMLDivElement>) => {
  const snap = useSnapshot(audioStore);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        audioStore.scrollY = ref.current.scrollTop;
      }
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return snap.scrollY;
};
