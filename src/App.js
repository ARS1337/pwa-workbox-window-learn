import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Page2 from "./Pages/Page2";
import Page3 from "./Pages/Page3";

function App() {
  const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);
  const [activeServiceWorker, setActiveServiceWorker] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredEvent, setDeferredEvent] = useState(null);

  const setAllServiceWorkers = async () => {
    try {
      let waitingWorker = await navigator.serviceWorker
        .getRegistration()
        .then((res) => {
          setActiveServiceWorker(res.active);
          return res.waiting || null;
        });
      setWaitingServiceWorker(waitingWorker);
      window.waitingWorker = waitingWorker;
      waitingWorker && setShowUpdateButton(true);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const setBeforeInstallEventListener = () => {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt fired");
      e.preventDefault();
      setDeferredEvent(e)
    });
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        setAllServiceWorkers();
        setBeforeInstallEventListener();
      }, 2000);
    });
  }, []);

  const handleUpdate = () => {
    try {
      console.log("handleUpdate called", waitingServiceWorker);
      if (waitingServiceWorker) {
        waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
        setShowUpdateButton(false);
        setActiveServiceWorker(waitingServiceWorker);
      }
    } catch (err) {
      console.log("error in handleUpdate666 ", err);
    }
  };

  const handleInstall = () => {
    try {
      // activeServiceWorker.postMessage({ type: "INSTALL" });
      deferredEvent.prompt()
    } catch (err) {
      console.log("error in handleInstall",err);
    }
  };

  return (
    <div>
      <p> Header title</p>
      {showUpdateButton && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            minWidth: "100%",
          }}
        >
          <p>
            New Content is Available,{" "}
            <button onClick={handleUpdate}>update</button> to find out
          </p>
        </div>
      )}
      <button onClick={handleInstall}>Install</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Page2" element={<Page2 />} />
        <Route path="Page3" element={<Page3 />} />
      </Routes>
    </div>
  );
}

export default App;
