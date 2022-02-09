// Module Exports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useLayoutEffect, useState } from "react";
// Components
import AbsoluteContent from "./components/AbsoluteContent";
import Header from "./components/Header";
import MainHeaderContent from "./components/MainHeaderContent";
import Main from "./components/Main";
import BakeryGoogleMaps from "./components/BakeryGoogleMaps";
import Footer from "./components/Footer";
import ScrollToTop from "./components/Small_Components/ScrollToTop";
// Single Pages
import Cakes from "./components/Cakes";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin/Admin";
// FetchAPI
import fetchCakes from "./lib/fetchCakes";
// Style Sheets
import "./App.css";

const App = () => {
  const [FixedCakes, setFixedCakes] = useState([]);
  const [RCakes, setRCakes] = useState([]);

  const [AdminCakes, setAdminCakes] = useStateWithCallbackLazy([]);
  const [BackupCakes, setBackupCakes] = useState([]);
  const [AreCakesLoading, setAreCakesLoading] = useState("Loading Cakes...");
  const [displayNavNFooter, setdisplayNavNFooter] = useState("flex");
  const getCakes = async () => {
    const CakesFromServer = await fetchCakes();
    setBackupCakes(CakesFromServer);
    setRCakes(CakesFromServer);

    setAdminCakes(CakesFromServer);
    setFixedCakes(CakesFromServer);
    setAreCakesLoading("No Cakes to Display...");
    setdisplayNavNFooter("flex");
  };
  useLayoutEffect(() => {
    getCakes();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <AbsoluteContent />
      <Header Hdisplay={displayNavNFooter} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <MainHeaderContent Cakes={FixedCakes} />
              <Main Cakes={FixedCakes} />
              <BakeryGoogleMaps />
            </>
          }
        />
        <Route
          path="/Cakes"
          exact
          element={
            <>
              <Cakes
                Cakes={RCakes}
                BackupCakes={BackupCakes}
                setBackupCakes={setBackupCakes}
                AreCakesLoading={AreCakesLoading}
              />
            </>
          }
        />
        <Route
          path="/About"
          exact
          element={
            <>
              <About />
            </>
          }
        />
        <Route
          path="/Contact"
          exact
          element={
            <>
              <Contact />
              <BakeryGoogleMaps />
            </>
          }
        />
        <Route
          path="/NSDB-admin-grulla"
          exact
          element={
            <Admin
              Cakes={RCakes}
              setRCakes={setRCakes}
              setdisplayNavNFooter={setdisplayNavNFooter}
              AdminCakes={AdminCakes}
              setAdminCakes={setAdminCakes}
              FixedCakes={FixedCakes}
              setFixedCakes={setFixedCakes}
              getCakes={getCakes}
            />
          }
        />
      </Routes>
      <Footer Fdisplay={displayNavNFooter} />
    </Router>
  );
};

export default App;
