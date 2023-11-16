import React, { useState, useEffect, useContext, useReducer } from "react";
import { format, addDays, addSeconds } from "date-fns";
import { countdownTimer } from "../helper/calculateDuration";
import FetchData from "../store/fetch-context";
import "./VakatGraph.css";

const time = { hours: "", minutes: "", duration: "" };

const initialState = {
  sabahTime: time,
  podneTime: time,
  ikindijaTime: time,
  aksamTime: time,
  jacijaTime: time,
};

const reducer = (state, action) => {
  const updateTime = {
    hours: action.payload.hours,
    minutes: action.payload.minutes,
    duration: action.payload.duration,
  };

  switch (action.type) {
    case "SABAH_TIME":
      return {
        ...state,
        sabahTime: updateTime,
      };
    case "PODNE_TIME":
      return {
        ...state,
        podneTime: updateTime,
      };

    case "IKINDIJA_TIME":
      return {
        ...state,
        ikindijaTime: updateTime,
      };

    case "AKSAM_TIME":
      return {
        ...state,
        aksamTime: updateTime,
      };

    case "JACIJA_TIME":
      return {
        ...state,
        jacijaTime: updateTime,
      };

    default:
      return state;
  }
};

export const LastThirdOfTheNight = () => {
  const nextDay = addDays(new Date(), 1);
  const ctxdata = useContext(FetchData);
  const { vakat } = ctxdata.todayVakat;
  const nextDayVakat = ctxdata.nextDayVakat;

  let aksam = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(-2)}`);
  let nextSabah = new Date(`${format(nextDay, "MM dd yyyy")} ${nextDayVakat}`);

  const [lastThirdTime, setLastThirdTime] = useState();
  useEffect(() => {
    const { diff } = countdownTimer(nextSabah, aksam);
    setLastThirdTime(addSeconds(nextSabah, -diff / 3));
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      zadnja trećina noći {lastThirdTime ? format(lastThirdTime, "HH:mm") : ""}
    </div>
  );
};

function VakatGraph(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ctxdata = useContext(FetchData);
  const { vakat } = ctxdata.todayVakat;
  const nextDayVakat = ctxdata.nextDayVakat;
  const nextDay = addDays(new Date(), 1);

  let sabah = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(0)}`);
  let sunce = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(1)}`);
  let podne = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(2)}`);
  let ikindija = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(3)}`);
  let aksam = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(4)}`);
  let jacija = new Date(`${format(new Date(), "MM dd yyyy")} ${vakat.at(5)}`);
  let nextSabah = new Date(`${format(nextDay, "MM dd yyyy")} ${nextDayVakat}`);

  useEffect(() => {
    const { diff, h, m } = countdownTimer(sunce, sabah);

    dispatch({
      type: "SABAH_TIME",
      payload: { hours: h, minutes: m, duration: diff / 60 },
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(ikindija, podne);

    dispatch({
      type: "PODNE_TIME",
      payload: { hours: h, minutes: m, duration: diff / 60 },
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(aksam, ikindija);
    dispatch({
      type: "IKINDIJA_TIME",
      payload: { hours: h, minutes: m, duration: diff / 60 },
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(jacija, aksam);
    dispatch({
      type: "AKSAM_TIME",
      payload: { hours: h, minutes: m, duration: diff / 60 },
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(nextSabah, jacija);
    dispatch({
      type: "JACIJA_TIME",
      payload: { hours: h, minutes: m, duration: diff / 60 },
    });
    // eslint-disable-next-line
  }, []);

 


  let displayVakat = [];

  Object.keys(state).forEach(function (key) {
    displayVakat.push(state[key]);
  });

  const vakatNames = ["sabah", "podne", "ikindija", "akšam", "jacija"];

  return (
    <React.Fragment>
      <div className="vakats-main-div1">
        <div className="vakats-main-div2">
          <section className="vakats-duration-section">
            {displayVakat.map((vakat, index) => (
              <div
                key={index}
                style={{ height: `${vakat.duration / 2.5}px`, margin: "" }}
                className=""
              >
                {vakat.hours}h:{vakat.minutes}m
              </div>
            ))}
          </section>

          <section className="vakat-names-section">
            {vakatNames.map((names) => (
              <div key={names}>{names}</div>
            ))}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VakatGraph;
