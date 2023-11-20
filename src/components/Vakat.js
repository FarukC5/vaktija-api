import React from "react";
import "./Vakat.css";
import { format, formatDistance } from "date-fns";

const Vakat = ({
  vakatName,
  vakatTime,
  nextVakat,
  currentTime,
  findPrevVakat,
}) => {
  const currentVakatTime = format(new Date(), "HH:mm");
  const allVakatTimes = vakatTime.length < 5 ? "0" + vakatTime : vakatTime;

  const prevVakat =
    findPrevVakat.at(-1) !== undefined
      ? findPrevVakat.at(-1).length < 5
        ? "0" + findPrevVakat.at(-1)
        : findPrevVakat.at(-1)
      : currentVakatTime;

  const nextNextVakat =
    nextVakat !== undefined
      ? nextVakat.length < 5
        ? "0" + nextVakat
        : nextVakat
      : currentVakatTime;

  const DisplayRelativeTime = () => {
    let distance = formatDistance(
      new Date(`${format(new Date(), "yyyy MM dd")} ${vakatTime}`),
      currentTime,
      { addSuffix: true }
    );

    const minutesBefore = distance.slice(0, 2);
    const minutes = distance.slice(3, 5);
    const hoursBefore = distance.slice(6, 8);
    const hours = distance.slice(9, 11);

    const minutesEqual =
      minutesBefore == 1 ||
      minutesBefore == 21 ||
      minutesBefore == 31 ||
      minutesBefore == 41 ||
      minutesBefore == 51;

    const minutesEqualIn =
      minutes == 1 ||
      minutes == 21 ||
      minutes == 31 ||
      minutes == 41 ||
      minutes == 51;

    const hoursEqual = hoursBefore == 1 || hoursBefore == 21;

    const hoursEqualIn = hours == 1 || hours == 21;

    const relativeTime = distance.includes("ago")
      ? distance.includes("less")
        ? `prije par trenutaka`
        : distance.includes("minute")
        ? minutesEqual
          ? `prije ` + minutesBefore + ` minut`
          : `prije ` + minutesBefore + ` minuta`
        : hoursEqual
        ? `prije ` + hoursBefore + ` sat`
        : hoursBefore < 5
        ? `prije ` + hoursBefore + ` sata`
        : `prije ` + hoursBefore + ` sati`
      : distance.includes("nute")
      ? distance.includes("less")
        ? `za par trenutaka`
        : minutesEqualIn
        ? `za ` + minutes + ` minut`
        : `za ` + minutes + ` minuta`
      : hoursEqualIn
      ? `za ` + hours + ` sat`
      : hours < 5
      ? `za ` + hours + ` sata`
      : `za ` + hours + ` sati`;

    return (
      <>
        <div
          className={
            allVakatTimes === prevVakat
              ? `current-relative-time`
              : allVakatTimes === nextNextVakat
              ? `next-relative-time`
              : allVakatTimes > nextNextVakat
              ? `next-relative-time`
              : `past-relative-time`
          }
        >
          {relativeTime}
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ background: "" }} className="current-vakat-list">
        <h2
          className={
            vakatTime === nextVakat ? `vakat-list-h2` : `vakat-list-before`
          }
        >
          <div
            className={
              allVakatTimes === prevVakat
                ? `current-vakat-name`
                : allVakatTimes === nextNextVakat
                ? `next-vakat-name`
                : allVakatTimes > nextNextVakat
                ? `next-vakat-name`
                : `past-vakat-name`
            }
          >
            {vakatName}
          </div>
        </h2>

        <div className="vakat-time-h1">
          <h1
            className={
              allVakatTimes === prevVakat
                ? `current-list`
                : allVakatTimes === nextNextVakat
                ? `next-list`
                : allVakatTimes > nextNextVakat
                ? `next-list`
                : `past-list`
            }
          >
            {allVakatTimes}
          </h1>
        </div>
        <div></div>

        <div className="query-div">
          <h2
            className={
              vakatTime === nextVakat
                ? `vakat-list-query-h2`
                : `vakat-list-query-before`
            }
          >
            <div
              className={
                allVakatTimes === prevVakat
                  ? `current-vakat-name`
                  : allVakatTimes === nextNextVakat
                  ? `next-vakat-name`
                  : allVakatTimes > nextNextVakat
                  ? `next-vakat-name`
                  : `past-vakat-name`
              }
            >
              {vakatName}
            </div>
          </h2>
          <span>{<DisplayRelativeTime />}</span>
        </div>
      </div>
    </>
  );
};

export default Vakat;
