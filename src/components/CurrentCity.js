import React, { useContext } from "react";
import FetchData from "../store/fetch-context";

const CurrentCity = () => {
  const ctxdata = useContext(FetchData);
  const { lokacija, datum } = ctxdata.todayVakat;

  return (
    <>
      <section className="current-city">
        <h1>{lokacija}</h1>

        <div className="current-date">
          <div className={""}>
            <div className="lunar">
              {" "}
              <span>{datum[0]} </span>
            </div>
            <div className="solar">
              <span> {datum[1]}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentCity;
