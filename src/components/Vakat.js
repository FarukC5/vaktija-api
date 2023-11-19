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
    const hoursBefore = distance.slice(6, 8);
    const minutes = distance.slice(3, 5);

    const minutesEqual =
      distance.slice(0, 2) == 1 ||
      distance.slice(0, 2) == 21 ||
      distance.slice(0, 2) == 31 ||
      distance.slice(0, 2) == 41 ||
      distance.slice(0, 2) == 51;
    const minutesEqualIn =
      distance.slice(3, 5) == 1 ||
      distance.slice(3, 5) == 21 ||
      distance.slice(3, 5) == 31 ||
      distance.slice(3, 5) == 41 ||
      distance.slice(3, 5) == 51;
    const hoursEqual =
      distance.slice(6, 8) == 1 ||
      distance.slice(6, 8) == 21 ||
      distance.slice(6, 8) == 31 ||
      distance.slice(6, 8) == 41 ||
      distance.slice(6, 8) == 51;
    const hoursEqualIn =
      distance.slice(8, 10) == 1 ||
      distance.slice(8, 10) == 21 ||
      distance.slice(8, 10) == 31 ||
      distance.slice(8, 10) == 41 ||
      distance.slice(8, 10) == 51;

    const relativeTime = distance.includes("ago")
      ? distance.includes("less")
        ? `prije par trenutaka`
        : distance.includes("minute")
        ? minutesEqual
          ? `prije ` + minutesBefore + ` minut`
          : `prije ` + minutesBefore + ` minuta`
        : hoursEqual
        ? `prije ` + distance.slice(6, 8) + ` sat`
        : distance.slice(6, 8) < 5
        ? `prije ` + hoursBefore + ` sata`
        : `prije ` + hoursBefore + ` sati`
      : distance.includes("nute")
      ? distance.includes("less")
        ? `za par trenutaka`
        : minutesEqualIn
        ? `za ` + minutes + ` minut`
        : `za ` + minutes + ` minuta`
      : hoursEqualIn
      ? `za ` + distance.slice(8, 10) + ` sat`
      : distance.slice(8, 10) < 5
      ? `za ` + distance.slice(8, 10) + ` sata`
      : `za ` + distance.slice(8, 10) + ` sati`;

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
