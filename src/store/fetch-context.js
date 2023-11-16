import React, {
  useRef,
  useEffect,
  createContext,
  useCallback,
  useReducer,
} from "react";
import { format, addDays } from "date-fns";

import Cookie from "universal-cookie";

const FetchData = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA":
      return {
        ...state,
        todayVakat: action.payload.todayVakat,
        nextDayVakat: action.payload.nextDayVakat,
        prevDayVakat: action.payload.prevDayVakat,
      };
    case "TOWN_INDEX":
      return {
        ...state,
        townIndex: action.payload.townIndex,
      };

    case "ERROR":
      return {
        ...state,
        serverError: action.payload.serverError,
      };

    default:
      return state;
  }
};

export const FetchDataProvider = (props) => {
  const cookies = new Cookie();
  const cookieTownIndex = useRef();

  const localization = useCallback(() => {
    if (cookies.get("location") !== undefined) {
      cookieTownIndex.current = cookies.get("location");
      return;
    }
    //eslint-disable-next-line
  }, []);

  localization();

  const [state, dispatch] = useReducer(reducer, {
    todayVakat: "",
    nextDayVakat: "",
    prevDayVakat: "",
    townIndex: cookieTownIndex.current,
    serverError: "",
  });

  useEffect(() => {
    if (state.townIndex !== undefined) {
      cookies.set("location", state.townIndex, {
        path: "/",
        sameSite: "Lax",
        secure: true,
      });
    }
    // eslint-disable-next-line
  }, [state.townIndex]);

  const tomorrowDay = addDays(new Date(), 1);
  const yesterDay = addDays(new Date(), -1);

  const http = `https://api.vaktija.ba/vaktija/v1`;

  const url = `${http}/${
    state.townIndex === 0 ? 0 : state.townIndex || "77"
  }/ ${format(new Date(), "yyyy/MM/dd")}`;

  const nextUrl = `${http}/${
    state.townIndex === 0 ? 0 : state.townIndex || "77"
  }/ ${format(tomorrowDay, "yyyy/MM/dd")}`;

  const prevUrl = `${http}/${
    state.townIndex === 0 ? 0 : state.townIndex || "77"
  }/ ${format(yesterDay, "yyyy/MM/dd")}`;

  const fetchData = async () => {
    try {
      const [response1, response2, response3] = await Promise.all([
        fetch(url),
        fetch(nextUrl),
        fetch(prevUrl),
      ]);

      if (!response1.ok || !response2.ok || !response3.ok) {
        throw new Error("Cound not fetch data!");
      }

      const [data1, data2, data3] = await Promise.all([
        response1.json(),
        response2.json(),
        response3.json(),
      ]);

      dispatch({
        type: "DATA",
        payload: {
          todayVakat: data1,
          nextDayVakat: data2.vakat.at(0),
          prevDayVakat: data3.vakat.at(-1),
        },
      });
      return data1;
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: {
          serverError: "Error: Cound not fetch data!",
        },
      });

      return;
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [state.townIndex]);

  const todayVakat = state.todayVakat;
  const prevDayVakat = state.prevDayVakat;
  const nextDayVakat = state.nextDayVakat;
  const townIndex = state.townIndex;

  const setTownIndex = (index) => {
    dispatch({
      type: "TOWN_INDEX",
      payload: { townIndex: index },
    });
  };

  return (
    <>
      {state.todayVakat && (
        <FetchData.Provider
          value={{
            todayVakat,
            prevDayVakat,
            nextDayVakat,
            setTownIndex,
            townIndex,
          }}
        >
          {props.children}
        </FetchData.Provider>
      )}
      {state.serverError && (
        <>
          <h2 style={{ textAlign: "", margin: "20px", color: "white" }}>
            {state.serverError}
          </h2>
        </>
      )}
    </>
  );
};

export default FetchData;
