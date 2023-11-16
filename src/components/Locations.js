import React, { useContext, useEffect } from "react";
import "./Locations.css";
import FetchData from "../store/fetch-context";

const { locationsShort } = require("../data/data.json");

const Locations = ({ closeLocationBar }) => {
  const ctx = useContext(FetchData);

  return (
    <>
      <div id="locations" className="sidenav">
        <div className="text-end" xs={12} sm={12} md={12} lg={12}>
          <a
            href="true"
            className="closebtn"
            onClick={(e) => closeLocationBar(e)}
          >
            &times;
          </a>
        </div>
        <div className="cities">
          {locationsShort.map((location, index) => {
            return (
              <span
                onClick={(e) => {
                  ctx.setTownIndex(index);
                  closeLocationBar(e);
                }}
                key={index}
              >
                {location}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Locations;
