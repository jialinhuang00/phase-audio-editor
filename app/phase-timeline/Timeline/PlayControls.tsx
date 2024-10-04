"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type PlayControlsProps = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
};
const STEP = 10;
const MIN_VALUE = 0;
const ALLOW_KEYS = [
  "Backspace",
  "Delete",
  "ArrowUp",
  "ArrowDown",
  "Enter",
  "Escape",
  ".",
  "-",
];

const isValidNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && num >= MIN_VALUE;
};

export const PlayControls = ({ time, setTime }: PlayControlsProps) => {
  const [inputValue, setTemporaryTime] = useState(time.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const lastValidValue = useRef(time.toString());
  const focusValue = useRef(time.toString());
  const isCancelling = useRef(false);
  const shouldSelectRef = useRef(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/^0+(?=\d)/, "");

    let numericValue = parseFloat(newValue);

    if (numericValue < 0) newValue = "0";
    numericValue = Math.round(parseFloat(newValue));

    // for negative situation
    if (newValue === "") {
      setTemporaryTime("");
      return;
    }

    if (newValue === "" || isValidNumber(newValue)) {
      setTemporaryTime(numericValue.toString());
      // native input up-down button, directly update time
      if (Math.abs(numericValue - Number(lastValidValue.current)) === STEP) {
        setTime(Math.round(numericValue));
        e.target.select();
      }
      lastValidValue.current = newValue.toString();
    } else {
      // back to origin
      console.log("back to origin");
      setTemporaryTime(lastValidValue.current);
    }
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isCancelling.current) {
        const newValue = Number(inputValue);
        setTime(newValue);
        lastValidValue.current = newValue.toString();
      }
      isCancelling.current = false;
    },
    [inputValue, setTime]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    focusValue.current = e.target.value;
    e.target.select();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // only allow these keys
      if (
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9") ||
        ALLOW_KEYS.includes(e.key)
      ) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          const stepChange = e.key === "ArrowUp" ? STEP : -STEP;
          const newValue = Math.max(Number(inputValue) + stepChange, 0);
          setTemporaryTime(newValue.toString());
          setTime(newValue);
          shouldSelectRef.current = true;
        } else if (e.key === "Enter") {
          inputRef.current?.blur();
        } else if (e.key === "Escape") {
          cancel();
        }
        return;
      }

      e.preventDefault();
    },
    [inputValue, setTime]
  );

  const cancel = useCallback(() => {
    isCancelling.current = true;
    setTemporaryTime(focusValue.current);
    setTime(Number(focusValue.current));
    inputRef.current?.blur();
  }, [setTime]);

  useEffect(() => {
    if (shouldSelectRef.current && inputRef.current) {
      inputRef.current.select();
      shouldSelectRef.current = false;
    }
  }, [inputValue]);

  return (
    <div
      className="flex items-center text-white justify-between border-b border-r border-solid border-gray-700 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          ref={inputRef}
          className="bg-gray-700 px-1 rounded"
          data-testid="current-time-input"
          min={MIN_VALUE}
          max={2000}
          step={STEP}
          type="number"
          value={inputValue}
          onInput={handleInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="duration-input"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        />
        Duration
      </fieldset>
    </div>
  );
};
