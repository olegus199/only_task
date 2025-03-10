import styles from "./PeriodSelectorCircle.module.scss";
import { FC, useEffect, useRef } from "react";
import YearsHeader from "./YearsHeader.tsx";
import { useHistoricalDates } from "./historical-dates-context.ts";

const ANGLE_STEP = 60; //degrees
const FULL_CIRCLE = 360; //degrees

interface DotProps {
  idx: number;
  rotation: number;
}

const PeriodSelectorCircle: FC = () => {
  const { activeTimePeriod: { currentIdx, multiplier }, dotsAmount } = useHistoricalDates();
  const rotation = currentIdx * ANGLE_STEP * -1 - multiplier * FULL_CIRCLE;

  return (
    <div
      className={styles.years_selector}
    >
      <div
        style={{ transform: `rotate(${rotation}deg)` }}
        className={styles.circle}
      >
        {Array(dotsAmount).fill(0).map((_, idx) => (
          <Dot
            key={idx}
            idx={idx}
            rotation={rotation}
          />
        ))}
      </div>
      <YearsHeader />
    </div>
  );
};

const Dot: FC<DotProps> = ({ idx, rotation }) => {
  const {
    activeTimePeriod,
    handleChangeActiveTimePeriod,
    timePeriods,
    translatedTimePeriodNames,
  } = useHistoricalDates();
  const { name: activePeriodName, currentIdx, multiplier } = activeTimePeriod;
  const dotPeriodName = timePeriods[idx]?.name;

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const activePeriodNameRef = useRef<HTMLParagraphElement>(null);

  function handleDotClick(index: number): void {
    const nameElement = activePeriodNameRef.current;
    if (nameElement) {
      nameElement.classList.remove(`${styles.active_period_name_visible}`);
    }

    let step = index - currentIdx;
    const nextIdx = currentIdx + step;
    let nextMultiplier = multiplier;

    // Add / subtract multiplier to support full circle overflow
    if (nextIdx <= 1 && step < -3) {
      nextMultiplier += 1;
    } else if (step >= 4) {
      nextMultiplier -= 1;
    }

    handleChangeActiveTimePeriod(dotPeriodName, nextIdx, nextMultiplier);
  }

  function addPeriodNameVisibility(): void {
    const nameElement = activePeriodNameRef.current;
    if (nameElement) {
      nameElement.classList.add(`${styles.active_period_name_visible}`);
    }
  }

  useEffect(() => {
    timeout.current = setTimeout(() => {
      addPeriodNameVisibility();
    }, 900);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [activePeriodName]);

  // Set init visibility
  useEffect(() => {
    addPeriodNameVisibility();
  }, []);

  return (
    <>
      <div
        onClick={() => handleDotClick(idx)}
        style={{ transform: `translateX(-50%) translateY(-50%) rotate(${-rotation}deg)` }}
        className={`${styles.dot}  ${styles["item_" + [idx * ANGLE_STEP]]} 
    ${activePeriodName === dotPeriodName && styles.dot_active}`}
      >
        {activePeriodName === dotPeriodName && (
          <p
            ref={activePeriodNameRef}
            className={styles.active_period_name}
          >{translatedTimePeriodNames[activePeriodName]}</p>
        )}
      </div>
      <div
        style={{ transform: `translateX(-50%) translateY(-50%) rotate(${-rotation}deg)` }}
        className={`${styles.period_number} ${styles["item_" + [idx * ANGLE_STEP]]} ${activePeriodName === dotPeriodName && styles.period_number_visible}`}
      >
        {idx + 1}
      </div>
    </>
  );
};

export default PeriodSelectorCircle;