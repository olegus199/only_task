import styles from "./SwiperSlider.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ActiveTimePeriod, useHistoricalDates } from "./historical-dates-context.ts";
import "./SwiperStyles.scss";
import { IoChevronBackSharp } from "react-icons/io5";

const SwiperSlider: FC = () => {
  const { activeTimePeriod } = useHistoricalDates();

  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [currentData, setCurrentData] = useState<ActiveTimePeriod>(activeTimePeriod);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl) {
      timeout.current = setTimeout(() => {
        containerEl.classList.remove(`${styles.fade_out}`);
        containerEl.classList.add(`${styles.fade_in}`);

        swiperRef.current?.swiper.slideTo(0, 0);
        setCurrentData(activeTimePeriod);
      }, 900);
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
  }, [activeTimePeriod.name]);

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

  return (
    <div
      ref={containerRef}
      className={styles.swiper_container}
    >
      <button className={`${styles.swiper_button} button-prev`}>
        <IoChevronBackSharp />
      </button>
      <Swiper
        ref={swiperRef}
        className={styles.swiper}
        spaceBetween={80}
        slidesPerView={3}
        modules={[Navigation]}
        navigation={{
          prevEl: ".button-prev",
          nextEl: ".button-next",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {currentData.events.map((e, idx) => (
          <SwiperSlide key={idx}>
            <p className={styles.year}>{e.year}</p>
            <p className={styles.description}>{e.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`${styles.swiper_button} button-next`}>
        <IoChevronBackSharp
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default SwiperSlider;