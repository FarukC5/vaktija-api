import React from "react";
import "./Vakat.css";

const Vakat = ({ vakatName, vakatTime, nextVakat }) => {
  return (
    <>
      <div style={{ background: "" }} className="current-vakat-list">
        <h2
          className={
            vakatTime === nextVakat ? `vakat-list-h2` : `vakat-list-before`
          }
        >
          {vakatName}
        </h2>

        <div className="vakat-time-h1">
          <h1
            className={vakatTime === nextVakat ? `next-list` : `current-list`}
          >
            {vakatTime.length < 5 ? "0" + vakatTime : vakatTime}
          </h1>
        </div>

        <div className="query-div" style={{ background: "" }}>
          <h2
            className={
              vakatTime === nextVakat
                ? `vakat-list-query-h2`
                : `vakat-list-query-before`
            }
          >
            {vakatName}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Vakat;
