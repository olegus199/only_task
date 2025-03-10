import { FC, ReactNode, useEffect, useState } from "react";
import {
  ActiveTimePeriod,
  HistoricalDatesContext,
  IHistoricalDatesContext,
  TimePeriod,
  TimePeriodName,
  TranslatedTimePeriodName,
} from "./historical-dates-context.ts";

interface HistoricalDatesProviderProps {
  children: ReactNode;
}

const translatedTimePeriodNames: TranslatedTimePeriodName = {
  technologies: "Технологии",
  cinema: "Кино",
  literature: "Литература",
  theater: "Театр",
  sports: "Спорт",
  science: "Наука",
};

const timePeriods: TimePeriod[] = [
  {
    name: "technologies",
    years: [1980, 1986],
    events: [
      {
        year: 1980,
        description: "Sinclair Research выпускает домашний компьютер ZX80",
      },
      {
        year: 1981,
        description: "IBM выпускает первый персональный компьютер IBM PC.",
      },
      {
        year: 1982,
        description: "Появляется компакт-диск (CD), разработанный Sony и Philips.",
      },
      {
        year: 1983,
        description: "Первый мобильный телефон DynaTAC 8000X от Motorola поступает в продажу.",
      },
      {
        year: 1986,
        description: "Intel выпускает микропроцессор 80386.",
      },
    ],
  },
  {
    name: "cinema",
    years: [1987, 1991],
    events: [
      {
        year: 1987,
        description: "«Хищник»/Predator, США (реж. Джон Мактирнан)",
      },
      {
        year: 1988,
        description: "«Кто подставил кролика Роджера»/Who Framed Roger Rabbit, США (реж. Роберт Земекис)",
      },
      {
        year: 1989,
        description: "«Назад в будущее 2»/Back To The Future 2, США (реж. Роберт Земекис)",
      },
      {
        year: 1990,
        description: "«Крепкий орешек 2»/Die Hard 2, США (реж. Ренни Харлин)",
      },
      {
        year: 1991,
        description: "«Семейка Аддамс»/The Addams Family, США, (реж. Барри Зонненфельд)",
      },
    ],
  },
  {
    name: "literature",
    years: [1992, 1997],
    events: [
      {
        year: 1992,
        description: "Нобелевская премия по литературе - Дерек Уолкотт, «За блестящий образец карибского эпоса в 64 разделах».",
      },
      {
        year: 1994,
        description: "«Бессонница» - роман Стивена Кинга.",
      },
      {
        year: 1995,
        description: "Нобелевская премия по литературе — Шеймас Хини.",
      },
      {
        year: 1997,
        description: "«Гарри Поттер и Философский Камень» - Дж. К. Роулинг.",
      },
    ],
  },
  {
    name: "theater",
    years: [1998, 2005],
    events: [
      {
        year: 1999,
        description: "Премьера балета «Золушка» в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона",
      },
      {
        year: 2000,
        description: "возобновлено издание журнала «Театр».",
      },
      {
        year: 2002,
        description: "премьера трилогии Тома Стоппарда «Берег Утопии», Королевский Национальный театр, Лондон",
      },
      {
        year: 2004,
        description: "Премьера оперы «Любовь издалека» Кайи Саариахо, Зальцбургский фестиваль.",
      },
      {
        year: 2005,
        description: "Основан Центр Мейерхольда в Москве.",
      },
    ],
  },
  {
    name: "sports",
    years: [2006, 2014],
    events: [
      {
        year: 2006,
        description: "Баскетбольный клуб ЦСКА стал победителем национального первенства России.",
      },
      {
        year: 2008,
        description: "С 8 по 24 августа в Пекине прошли 29-е летние Олимпийские игры.",
      },
      {
        year: 2010,
        description: "13—28 февраля в Ванкувере: Зимние Олимпийские игры 2010 года.",
      },
      {
        year: 2012,
        description: "2 августа — Летние Олимпийские игры.",
      },
      {
        year: 2014,
        description: "XXII зимние Олимпийские игры (Сочи, Россия).",
      },
    ],
  },
  {
    name: "science",
    years: [2015, 2022],
    events: [
      {
        year: 2015,
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2016,
        description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: 2017,
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        year: 2018,
        description: "Были обнаружены две критические уязвимости в микропроцессорах: Meltdown и Spectre",
      },
      {
        year: 2021,
        description: "ОАЭ успешно вывели «Хоуп» на орбиту Красной планеты",
      },
      {
        year: 2022,
        description: "Большой Адронный Коллайдер возобновляет свою работу после 3 лет модернизации",
      },
    ],
  },
];

const HistoricalDatesProvider: FC<HistoricalDatesProviderProps> = ({ children }) => {
  const [activeTimePeriod, setActiveTimePeriod] = useState<ActiveTimePeriod>({
    ...timePeriods[0],
    currentIdx: 0,
    multiplier: 0,
  });

  const [animationDelay, setAnimationDelay] = useState(window.innerWidth <= 770 ? 350 : 900);

  function handleChangeActiveTimePeriod(
    name: TimePeriodName, newIdx: number, multiplier: number): void {
    const newTimePeriod = timePeriods.find((period) => period.name === name);
    if (newTimePeriod) {
      setActiveTimePeriod({
        ...newTimePeriod,
        currentIdx: newIdx,
        multiplier,
      });
    }
  }

  const value: IHistoricalDatesContext = {
    timePeriods,
    activeTimePeriod,
    translatedTimePeriodNames,
    handleChangeActiveTimePeriod,
    dotsAmount: timePeriods.length,
    animationDelay: animationDelay,
  };

  useEffect(() => {
    function handleResize(): void {
      setAnimationDelay(window.innerWidth <= 770 ? 350 : 900);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HistoricalDatesContext.Provider value={value}>
      {children}
    </HistoricalDatesContext.Provider>
  );
};

export default HistoricalDatesProvider;