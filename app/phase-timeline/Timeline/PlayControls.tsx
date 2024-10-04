"use client";
import { roundToNearestTen } from "@/stores/audioStore";
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
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};
const STEP = 10;
const MIN_VALUE = 0;
const DURATION_MIN_VALUE = 100;
const DURATION_MAX_VALUE = 6000;
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

export const PlayControls = ({
  time,
  setTime,
  duration,
  setDuration,
}: PlayControlsProps) => {
  const [temporaryTime, setTemporaryTime] = useState(time.toString());
  const [temporaryDuration, setTemporaryDuration] = useState(
    duration.toString()
  );

  const isCancelling = useRef(false);
  // time
  const timeRef = useRef<HTMLInputElement>(null);
  const lastTimeValue = useRef(time.toString());
  const focusTimeValue = useRef(time.toString());
  const shouldSelectAllTimeRef = useRef(false);

  // duration
  const durationRef = useRef<HTMLInputElement>(null);
  const lastDurationValue = useRef(time.toString());
  const focusDurationValue = useRef(time.toString());
  const shouldSelectAllDurationRef = useRef(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    isDuration: boolean
  ) => {
    let newValue = e.target.value.replace(/^0+(?=\d)/, "");

    let numericValue = parseFloat(newValue);

    if (numericValue < 0) newValue = "0";
    numericValue = Math.round(parseFloat(newValue));

    const setTemporary = isDuration ? setTemporaryDuration : setTemporaryTime;
    const setSure = isDuration ? setDuration : setTime;

    // for negative situation
    if (newValue === "") {
      setTemporary("");
      return;
    }

    const lastValue = isDuration ? lastDurationValue : lastTimeValue;
    if (newValue === "" || isValidNumber(newValue)) {
      setTemporary(numericValue.toString());
      // native input up-down button, directly update time
      if (Math.abs(numericValue - Number(lastValue.current)) === STEP) {
        setSure(Math.round(numericValue));
        e.target.select();
      }
      lastValue.current = newValue.toString();
    } else {
      // back to origin
      setTemporary(lastValue.current);
    }
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, isDuration: boolean) => {
      const lastValue = isDuration ? lastDurationValue : lastTimeValue;
      const temporaryValue = isDuration ? temporaryDuration : temporaryTime;
      const otherSetter = isDuration ? setTime : setDuration;

      if (!isCancelling.current) {
        let newValue = roundToNearestTen(Number(temporaryValue));
        if (isDuration) {
          newValue = Math.min(DURATION_MAX_VALUE, newValue);
          setTemporaryDuration(newValue.toString());
          setDuration(newValue);
          // if new duration < time，adjust time
          if (newValue < time) {
            otherSetter(newValue);
            setTemporaryTime(newValue.toString());
          }
        } else {
          // 確保 time 不超過 duration
          newValue = Math.min(newValue, duration);
          setTemporaryTime(newValue.toString());
          setTime(newValue);
        }
        lastValue.current = newValue.toString();
      }
      isCancelling.current = false;
    },
    [temporaryTime, setTime, temporaryDuration, setDuration, time, duration]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, isDuration: boolean) => {
      if (isDuration) focusDurationValue.current = e.target.value;
      else focusTimeValue.current = e.target.value;
      e.target.select();
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, isDuration: boolean) => {
      // only allow these keys
      const inputRef = isDuration ? durationRef : timeRef;
      const setTemporary = isDuration ? setTemporaryDuration : setTemporaryTime;
      const setSure = isDuration ? setDuration : setTime;
      const temporaryValue = isDuration ? temporaryDuration : temporaryTime;
      const shouldSelectAllRef = isDuration
        ? shouldSelectAllDurationRef
        : shouldSelectAllTimeRef;
      if (
        (e.key >= "0" && e.key <= "9") ||
        (e.key >= "Numpad0" && e.key <= "Numpad9") ||
        ALLOW_KEYS.includes(e.key)
      ) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          const stepChange = e.key === "ArrowUp" ? STEP : -STEP;
          const newValue = Math.max(Number(temporaryValue) + stepChange, 0);
          setTemporary(newValue.toString());
          setSure(newValue);
          shouldSelectAllRef.current = true;
        } else if (e.key === "Enter") {
          inputRef.current?.blur();
        } else if (e.key === "Escape") {
          cancel(isDuration);
        }
        return;
      }

      e.preventDefault();
    },
    [temporaryTime, temporaryDuration, setTime, setDuration]
  );

  const cancel = useCallback(
    (isDuration: boolean) => {
      isCancelling.current = true;
      if (isDuration) {
        setTemporaryDuration(focusDurationValue.current);
        setDuration(Number(focusDurationValue.current));
        durationRef.current?.blur();
      } else {
        setTemporaryTime(focusTimeValue.current);
        setTime(Number(focusTimeValue.current));
        timeRef.current?.blur();
      }
    },
    [setTime]
  );

  // arrow keyboard for time
  useEffect(() => {
    if (shouldSelectAllTimeRef.current && timeRef.current) {
      timeRef.current.select();
      shouldSelectAllTimeRef.current = false;
    }
  }, [temporaryTime]);

  // after clicking ruler
  useEffect(() => {
    if (time !== Number(temporaryTime)) {
      setTemporaryTime(time.toString());
      setTime(time);
    }
  }, [time]);

  // arrow keyboard for duration
  useEffect(() => {
    if (shouldSelectAllDurationRef.current && durationRef.current) {
      durationRef.current.select();
      shouldSelectAllDurationRef.current = false;
    }
  }, [temporaryDuration]);

  return (
    <div
      className="flex items-center text-white justify-between border-b border-r border-solid border-gray-700 px-2 text-xs"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          ref={timeRef}
          className="bg-gray-700 px-1 rounded"
          data-testid="current-time-input"
          min={MIN_VALUE}
          max={duration}
          step={STEP}
          type="number"
          value={temporaryTime}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(e, false)
          }
          onBlur={(e) => handleBlur(e, false)}
          onFocus={(e) => handleFocus(e, false)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          ref={durationRef}
          className="bg-gray-700 px-1 rounded"
          data-testid="duration-input"
          min={DURATION_MIN_VALUE}
          max={DURATION_MAX_VALUE}
          step={STEP}
          type="number"
          value={temporaryDuration}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(e, true)
          }
          onBlur={(e) => handleBlur(e, true)}
          onFocus={(e) => handleFocus(e, true)}
          onKeyDown={(e) => handleKeyDown(e, true)}
        />
        Duration
      </fieldset>
    </div>
  );
};
