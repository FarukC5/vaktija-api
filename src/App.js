import React, { useState } from "react";
import "./App.css";
import AppFooter from "./components/AppFooter";
import Counter from "./components/Counter";
import Locations from "./components/Locations";
import Modal from "./UIElements/Modal";
import VakatGraph from "./animated/VakatGraph";
import MyLunarDate from "./animated/MyLunarDate";
import { YearGraph } from "./animated/YearGraph";
import { LastThirdOfTheNight } from "./animated/VakatGraph";
import { MonthsAndDays } from "./animated/YearGraph";
import { MapMarkerIcon, DayDiagram, CalendarIcon } from "./icons/svg-icons";

const App = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCase, setShowCase] = useState(false);
  const switcher = () => {
    setShowCase(!showCase);
  };
  const opentCalculator = () => setShowCalculator(true);
  const closeCalculator = () => {
    setShowCalculator(false);
  };
  const openVakatDiagramModal = () => setShowModal(true);
  const closeVakatDiagramModal = () => {
    setShowModal(false);
    setShowCase(false);
  };
  const openLocationBar = () => {
    document.getElementById("locations").style.width = "100%";
  };
  const closeLocationBar = (e) => {
    e.preventDefault();
    document.getElementById("locations").style.width = "0%";
  };

  const DailyHeader = () => {
    return (
      <div className="daily-header">
        <div className="header-buttons">
          <button onClick={switcher}>Godišnji prikaz</button>
          <button onClick={closeVakatDiagramModal}>zatvori</button>
        </div>
        <LastThirdOfTheNight />
      </div>
    );
  };

  const YearlyHeader = () => {
    return (
      <>
        <div className="header-buttons">
          <button onClick={switcher}>Dnevni prikaz</button>
          <button onClick={closeVakatDiagramModal}>zatvori</button>
        </div>
        <MonthsAndDays />
      </>
    );
  };

  const DateHeader = () => {
    return (
      <>
        <div className="date-header">
          Ovdje možete pronaći datum u rasponu od 1937 g. do 2077 g. koji bi
          odgovarao hidžretskom kalendaru
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      {showCase ? (
        <Modal
          show={showModal}
          header={<YearlyHeader />}
          contentClass="modal-content-c"
          footerClass="modal-actions-a"
        >
          <YearGraph {...props} />
        </Modal>
      ) : (
        <Modal
          show={showModal}
          header={<DailyHeader />}
          contentClass="modal-content-c"
          footerClass="modal-actions-a"
        >
          <VakatGraph onClick={closeVakatDiagramModal} {...props} />
        </Modal>
      )}

      <Modal
        show={showCalculator}
        header={<DateHeader />}
        contentClass="modal-content-c"
        footerClass="modal-actions-a"
        footer={<button onClick={closeCalculator}>zatvori</button>}
      >
        <MyLunarDate onClick={closeCalculator} {...props} />
      </Modal>

      <header className="app-header">
        <DayDiagram onClick={openVakatDiagramModal} />

        <CalendarIcon onClick={opentCalculator} />
        <MapMarkerIcon onClick={openLocationBar} />
      </header>

      <header className="app-header-2"></header>

      <Locations closeLocationBar={closeLocationBar} />

      <Counter />

      <AppFooter />
    </React.Fragment>
  );
};

export default App;
