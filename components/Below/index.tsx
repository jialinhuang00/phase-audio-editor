"use client";
import { useState } from "react";
import { PhaseReadmeChecklist } from "@/components/Below/PhaseChecklist";
import { Readme } from "@/components/Below/Readme";

export default function Below() {
  const [showChecklist, setShowChecklist] = useState(false);

  return (
    <div
      className="relative flex flex-col p-4 h-[calc(100vh-300px)] w-full 
    border-t-2 border-solid  overflow-auto"
    >
      <button
        onClick={() => setShowChecklist(!showChecklist)}
        className="mb-4 border-dashed border-1 border"
      >
        {showChecklist ? "Show Readme" : "Show Checklist"}
      </button>

      {showChecklist ? <PhaseReadmeChecklist /> : <Readme />}
    </div>
  );
}
