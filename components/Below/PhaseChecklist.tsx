"use client";
import { SectionKey, Item, checkStore } from "@/stores/checkStore";
import React from "react";
import { useSnapshot } from "valtio";

export function PhaseReadmeChecklist() {
  const { sections } = useSnapshot(checkStore);
  const toggleSection = (sectionKey: SectionKey) => {
    checkStore.sections[sectionKey].isOpen =
      !checkStore.sections[sectionKey].isOpen;
  };

  const toggleItem = (sectionKey: SectionKey, index: number) => {
    checkStore.sections[sectionKey].items[index].checked =
      !checkStore.sections[sectionKey].items[index].checked;
  };

  const renderSection = (title: string, sectionKey: SectionKey) => {
    const section = sections[sectionKey];
    return (
      <div key={sectionKey} className="mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center text-lg font-bold mb-2 rounded w-full text-left"
        >
          {/* {section.isOpen ? "v" : ">"} */}
          {title}
        </button>
        {section.isOpen && (
          <div className="ml-6">
            {section.items.map((item: Item, index: number) => (
              <label
                key={index}
                className="flex items-start mb-1 cursor-pointer p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(sectionKey, index)}
                  className=" mr-2"
                />
                <span className="text-xs select-none">{item.text}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Checklist</h1>
      {renderSection("Number Input Field", "numberInput")}
      {renderSection("Play Controls Behavior", "playControls")}
      {renderSection("Ruler Behavior", "ruler")}
      {renderSection("Track List Behavior", "trackList")}
      {renderSection("Keyframe List Behavior", "keyframeList")}
      {renderSection("Playhead Behavior", "playhead")}
    </>
  );
}
