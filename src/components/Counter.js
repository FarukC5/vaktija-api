import React, { useEffect, useContext, useReducer } from "react";

import {
  format,
  addDays,
  isFriday,
  startOfDay,
  addSeconds,
  differenceInSeconds,
} from "date-fns";

import FetchData from "../store/fetch-context";
import { countdownTimer } from "../helper/calculateDuration";
import TimeProgressLinear from "../animated/TimeProgressLinear";
import Vakat from "./Vakat";
import CurrentCity from "./CurrentCity";

const initialState = {
  hours: "",
  minutes: "",
  seconds: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "COUNTER":
      return {
        ...state,
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
      };
    default:
      return state;
  }
};

const Counter = (props) => {
  const ctxdata = useContext(FetchData);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { vakat } = ctxdata.todayVakat;
  const nextDayVakat = ctxdata.nextDayVakat;
  const prevDayVakat = ctxdata.prevDayVakat;

  const thisDate = startOfDay(new Date());
  const tomorrowDay = addDays(new Date(), 1);
  const yesterDay = addDays(new Date(), -1);
  const prevDayDate = startOfDay(yesterDay);
  const nextDayDate = startOfDay(tomorrowDay);

  let currentTime = new Date();

  let findNextVakat = vakat.filter(
    (v) => currentTime < new Date(`${format(new Date(), "yyyy MM dd")} ${v}`)
  );

  let findPrevVakat = vakat.filter(
    (v) => currentTime >= new Date(`${format(new Date(), "yyyy MM dd")} ${v}`)
  );

  let nextVakat = findNextVakat.at(0);

  const nextVakatTime =
    nextVakat !== undefined
      ? new Date(`${format(thisDate, "yyyy-MM-dd")} ${findNextVakat[0]}`)
      : addSeconds(
          new Date(`${format(nextDayDate, "yyyy-MM-dd")} ${nextDayVakat}`),
          1
        );

  const duration = Math.floor(differenceInSeconds(nextVakatTime, currentTime));

  const difference =
    nextVakat !== undefined
      ? currentTime < new Date(`${format(thisDate, "yyyy-MM-dd")} ${vakat[0]}`)
        ? Math.floor(
            differenceInSeconds(
              new Date(`${format(thisDate, "yyyy-MM-dd")} ${vakat[0]}`),
              new Date(`${format(prevDayDate, "yyyy-MM-dd")} ${prevDayVakat}`)
            )
          )
        : Math.floor(
            differenceInSeconds(
              new Date(`${format(thisDate, "yyyy-MM-dd")} ${findNextVakat[0]}`),
              new Date(
                `${format(thisDate, "yyyy-MM-dd")} ${findPrevVakat.at(-1)}`
              )
            )
          )
      : Math.floor(
          differenceInSeconds(
            new Date(`${format(nextDayDate, "yyyy-MM-dd")} ${nextDayVakat}`),
            new Date(
              `${format(thisDate, "yyyy-MM-dd")} ${findPrevVakat.at(-1)}`
            )
          )
        );

  const DisplayTimeCounter = () => {
    useEffect(() => {
      const intervalCount = setInterval(() => {
        const { h, m, s } = countdownTimer(nextVakatTime, currentTime);
        dispatch({
          type: "COUNTER",
          ...state,
          payload: {
            hours: h,
            minutes: m,
            seconds: s,
          },
        });
      }, 1000);
      return () => clearInterval(intervalCount);
    }, []);

    return (
      <section>
        <div
          id="timeCounter"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {state.hours.toString().padStart(2, "0")}:
          {state.minutes.toString().padStart(2, "0")}:
          {state.seconds.toString().padStart(2, "0")}
        </div>
      </section>
    );
  };

  const vakatNames = [
    "Zora",
    "Izlazak Sunca",
    isFriday(currentTime) ? "Podne/Džuma" : "Podne",
    "Ikindija",
    "Akšam",
    "Jacija",
  ];

  return (
    <React.Fragment>
      <DisplayTimeCounter />
      <TimeProgressLinear duration={duration} difference={difference} />
      <CurrentCity />
      <div className="current-vakat-map">
        {vakatNames.map((vakatName, index) => {
          return (
            <Vakat
              key={vakat[index]}
              index={index}
              vakatName={vakatName}
              vakatTime={vakat[index]}
              nextVakat={nextVakat}
              currentTime={currentTime}
              findPrevVakat={findPrevVakat}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Counter;
