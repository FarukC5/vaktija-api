import React, { useEffect, useReducer } from "react";
import "./TimeProgressLinear.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        value: action.payload.value,
      };

    default:
      return state;
  }
};

function TimeProgressLinear({ duration, difference }) {
  const [state, dispatch] = useReducer(reducer, { value: "" });

  useEffect(() => {
    const val = ((+duration / +difference) * 100).toFixed(2);
    dispatch({
      type: "SET_VALUE",
      payload: { value: +val },
    });
   // eslint-disable-next-line
  }, [duration]);

  return (
    <>
      <div className="progress" id="container">
        <div className="barOuter">
          <div className="barInner" style={{ width: `${state.value}%` }}></div>
        </div>
      </div>
    </>
  );
}

export default TimeProgressLinear;
