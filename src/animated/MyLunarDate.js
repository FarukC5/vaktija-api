import React, { useReducer } from "react";
import "./MyLunarDate.css";
import { SearchIcon } from "../icons/svg-icons";

const initialState = {
  day: "",
  month: "",
  year: "",
  data: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATE":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case "DATA":
      return {
        ...state,
        data: action.payload.data,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

function MyLunarDate() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "DATE",
      payload: { field: name, value },
    });
    dispatch({
      type: "DATA",
      payload: { error: "" },
    });
  };

  const url = `https://api.vaktija.ba/vaktija/v1/77/${state.year}/${state.month}/${state.day}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Cound not fetch data!");
      }
      const data = await response.json();
      if (data.datum[0].includes("nan.")) {
        dispatch({
          type: "DATA",
          payload: { data: "", error: "Pogrešan unos!" },
        });
      } else
        dispatch({
          type: "DATA",
          payload: { data: data, error: "" },
        });

      return { data };
    } catch (err) {
      dispatch({
        type: "DATA",
        payload: { data: "", error: "Pogrešan unos!" },
      });
      return;
    }
  };

  return (
    <>
      <div className="day-month-year">
        <select id="day" name="day" onChange={handleChange}>
          <option value="">Dan</option>
          {days.map((day, index) => (
            <option key={index} value={day} style={{ color: "" }}>
              {day}
            </option>
          ))}
        </select>

        <select id="month" name="month" onChange={handleChange}>
          <option value="">Mjesec</option>
          {months.map((month, index) => (
            <option key={index + 1} value={index + 1}>{`${month}`}</option>
          ))}
        </select>

        <input
          className="year"
          id="year"
          placeholder="Godina"
          name="year"
          min="1938"
          max="2077"
          type="number"
          onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
          onChange={handleChange}
        ></input>
        <SearchIcon className="search-icon" onClick={fetchData} />
      </div>
      <div className="output">
        {state.data && (
          <p>
            {state.data.datum[0]} .h.g / {state.data.datum[1]}.g
          </p>
        )}
        <p>{state.error}</p>
      </div>
    </>
  );
}

export default MyLunarDate;
