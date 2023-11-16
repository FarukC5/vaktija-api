import { vakats } from "../data/vakats";
import "./YearGraph.css";
import React, {useEffect, useRef, useReducer } from "react";
import { countdownTimer } from "../helper/calculateDuration";
import { format, addDays } from "date-fns";

const initialState = {
  sabahTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][0],
  },

  podneTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][2],
  },
  ikindijaTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][3],
  },
  aksamTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][4],
  },
  jacijaTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][5],
  },
  nextSabahTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][6],
  },
  sunceTime: {
    hours: "",
    minutes: "",
    duration: "",
    vakat: vakats[1][1],
  },
};

const reducer = (state, action) => {
  const updateTime = {
    hours: action.payload.hours,
    minutes: action.payload.minutes,
    duration: action.payload.duration,
    vakat: action.payload.vakat,
  };

  switch (action.type) {
    case "SABAH_TIME":
      return {
        ...state,
        sabahTime: updateTime,
      };

    case "SUNCE_TIME":
      return {
        ...state,
        sunceTime: updateTime,
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

    case "NEXT_SABAH":
      return {
        ...state,
        nextSabahTime: updateTime,
      };

    case "VAKAT_TIME":
      return {
        ...state,
        vakat: action.payload.vakat,
      };

    default:
      return state;
  }
};

export const MonthsAndDays = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const days = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const renders = useRef(1);
  const timerId = useRef();
  const timerSpeed = useRef(50);

  const startTimer = () => {
    timerId.current = setInterval(() => {
     
      dispatch({
        type: "VAKAT_TIME",
        payload: { vakat: vakats[renders.current] },
      });
      
      renders.current++;

      if (renders.current > 365) {
        renders.current = 1;
      }
    }, timerSpeed.current);
    return () => clearInterval(timerId.current);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className="yearly-header">
        <div className="yearly-numbers">{days.at(renders.current)}.</div>
        <div className="yearly-days">
          {renders.current < 32 && ( // 1-31   // <33
            <div>Januar</div>
          )}
          {renders.current > 31 &&
            renders.current < 60 && ( //32 -59
              <div>Februar</div>
            )}

          {renders.current > 59 &&
            renders.current < 91 && ( //60-90
              <div>Mart</div>
            )}

          {renders.current > 90 &&
            renders.current < 121 && ( //91-120
              <div>April</div>
            )}
          {renders.current > 120 &&
            renders.current < 152 && ( //121 - 151
              <div>Maj</div>
            )}

          {renders.current > 151 &&
            renders.current < 182 && ( //152 - 181
              <div>Juni</div>
            )}

          {renders.current > 181 &&
            renders.current < 213 && ( // 182 - 212
              <div>Juli</div>
            )}
          {renders.current > 212 &&
            renders.current < 244 && ( // 213 - 243
              <div>August</div>
            )}

          {renders.current > 243 &&
            renders.current < 274 && ( // 244 - 273
              <div>Septembar</div>
            )}
          {renders.current > 273 &&
            renders.current < 305 && ( // 274 - 304
              <div>Oktobar</div>
            )}
          {renders.current > 304 &&
            renders.current < 335 && ( // 305 - 334
              <div>Novembar</div>
            )}

          {renders.current > 334 &&
            renders.current < 366 && ( // 335 - 365
              <div>Decembar</div>
            )}
        </div>
      </div>
    </>
  );
};

export const YearGraph = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const renders = useRef(1);
  const timerId = useRef();
  const timerSpeed = useRef(50);

  const startTimer = () => {
    timerId.current = setInterval(() => {
     
      dispatch({
        type: "VAKAT_TIME",
        payload: { vakat: vakats[renders.current] },
      });

      renders.current++;

      if (renders.current > 365) {
        renders.current = 1;
      }
    }, timerSpeed.current);
    return () => clearInterval(timerId.current);
  };

  useEffect(() => {
    startTimer();
  }, []);

  const thisDate = format(new Date(), "MM dd yyyy");
  const nextDay = addDays(new Date(), 1);

  let sabah = new Date(`${thisDate} ${state.sabahTime.vakat}`);
  let sunce = new Date(`${thisDate} ${state.sunceTime.vakat}`);
  let podne = new Date(`${thisDate} ${state.podneTime.vakat}`);
  let ikindija = new Date(`${thisDate} ${state.ikindijaTime.vakat}`);
  let aksam = new Date(`${thisDate} ${state.aksamTime.vakat}`);
  let jacija = new Date(`${thisDate} ${state.jacijaTime.vakat}`);
  let nextSabah = new Date(
    `${format(nextDay, "MM dd yyyy")} ${state.nextSabahTime.vakat}`
  );

  useEffect(() => {
    const { diff, h, m } = countdownTimer(sunce, sabah);

    dispatch({
      type: "SABAH_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][0],
      },
    });
    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    const { diff, h, m } = countdownTimer(podne, sunce);

    dispatch({
      type: "SUNCE_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][1],
      },
    });
    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(ikindija, podne);

    dispatch({
      type: "PODNE_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][2],
      },
    });

    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(aksam, ikindija);
    dispatch({
      type: "IKINDIJA_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][3],
      },
    });

    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(jacija, aksam);
    dispatch({
      type: "AKSAM_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][4],
      },
    });
    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    const { h, m, diff } = countdownTimer(nextSabah, jacija);
    dispatch({
      type: "JACIJA_TIME",
      payload: {
        hours: h,
        minutes: m,
        duration: diff / 60,
        vakat: vakats[renders.current][5],
      },
    });
    // eslint-disable-next-line
  }, [renders.current]);

  useEffect(() => {
    dispatch({
      type: "NEXT_SABAH",
      payload: {
        vakat: vakats[renders.current][6],
      },
    });
    // eslint-disable-next-line
  }, [renders.current]);

  let displayVakat = [];

  Object.keys(state).forEach(function (key) {
    displayVakat.push(state[key]);
  });

  displayVakat.splice(5);

  const vakatNames = ["sabah", "podne", "ikindija", "akšam", "jacija"];

  return (
    <React.Fragment>
      <div className="vakats-main-div1">
        <div className="vakats-main-div2">
          <section className="vakats-duration-section1">
            {displayVakat.map((vakat, index) => (
              <div
                key={index}
                style={{ height: `${vakat.duration / 2.5}px`}}
                className=""
              >
                {vakat.hours}h:{vakat.minutes}m
              </div>
            ))}
          </section>

          <section className="vakat-names-section1">
            {vakatNames.map((names) => (
              <div key={names}>{names}</div>
            ))}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};
