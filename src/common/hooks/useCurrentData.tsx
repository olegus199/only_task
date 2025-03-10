import React, { useEffect, useRef, useState } from "react";
import {
  ActiveTimePeriod,
  useHistoricalDates,
} from "../../features/historical-dates/historical-dates-context.ts";
import styles from "../../features/historical-dates/SwiperSlider.module.scss";
import { SwiperRef } from "swiper/react";

const useCurrentData = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  swiperRef?: React.RefObject<SwiperRef | null>,
) => {
  const { activeTimePeriod, animationDelay } = useHistoricalDates();

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [currentData, setCurrentData] = useState<ActiveTimePeriod>(activeTimePeriod);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl) {
      timeout.current = setTimeout(() => {
        containerEl.classList.remove(`${styles.fade_out}`);
        containerEl.classList.add(`${styles.fade_in}`);

        swiperRef?.current?.swiper.slideTo(0, 0);
        setCurrentData(activeTimePeriod);
      }, animationDelay);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      const containerEl = containerRef.current;
      if (containerEl) {
        containerEl.classList.remove(`${styles.fade_in}`);
        containerEl.classList.add(`${styles.fade_out}`);
      }
    };
  }, [activeTimePeriod.name, animationDelay]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.classList.remove(`${styles.fade_out}`);
      containerEl.classList.add(`${styles.fade_in}`);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return { currentData };
};

export default useCurrentData;