import styles from "./AnimatedCounter.module.scss";
import React, { useRef, FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedCounterProps {
  targetValue: number;
  rangeBoundary: "from" | "to";
  duration?: number;
}

gsap.registerPlugin(useGSAP);

const INITIAL_VALUE_SUBTRAHEND = 10;

const AnimatedCounter: FC<AnimatedCounterProps> = ({
  targetValue,
  rangeBoundary,
  duration = .5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(ref.current, {
      duration,
      innerText: targetValue,
      ease: "sine.out",
      snap: { innerText: 1 },
    });
  });

  return <div
    ref={ref}
    className={`${styles.counter} ${rangeBoundary === "from" ? styles.from : styles.to}`}
  >
    {targetValue - INITIAL_VALUE_SUBTRAHEND}
  </div>;
};

export default AnimatedCounter;