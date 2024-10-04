import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { scrollStore } from "@/app/stores/scrollStore";

export const useScrollY = (ref: React.RefObject<HTMLDivElement>) => {
  const snap = useSnapshot(scrollStore);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        scrollStore.scrollY = ref.current.scrollTop;
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
