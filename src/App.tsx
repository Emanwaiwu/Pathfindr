import React, { useRef, useState, useEffect } from "react";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Nav } from "./components/Nav";
import Tutorial from "./components/Tutorial";
import nocellphones from "./assets/nocellphones.png";

function App() {
  const isVisualizationRunningRef = useRef(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setIsLargeScreen(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!isLargeScreen) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center px-10 py-8">
          <div className="flex justify-center">
            <img src={nocellphones} alt="" className="size-[10rem]" />
          </div>
          <h1 className="text-[2rem] font-main text-red-700">
            Please view this application on a laptop for better experience!!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col bg-[#020202]">
            <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
            <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            <Tutorial />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
