import "./SwiperStyles.scss";
import styles from "./SwiperSlider.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ActiveTimePeriod, useHistoricalDates } from "./historical-dates-context.ts";
import { IoChevronBackSharp } from "react-icons/io5";
import useCurrentData from "../../common/hooks/useCurrentData.tsx";

const SwiperSlider: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const { currentData } = useCurrentData(containerRef, swiperRef);

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
        modules={[Navigation]}
        breakpoints={{
          20: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          431: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          771: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1001: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1281: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
        }}
        navigation={{
          prevEl: ".button-prev",
          nextEl: ".button-next",
        }}
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