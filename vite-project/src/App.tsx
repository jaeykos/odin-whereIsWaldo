import { useState, useEffect, useRef } from "react";
import waldo from "./assets/waldo.jpeg";
import wendy from "./assets/wendy.jpeg";
import wizard from "./assets/wizard.jpeg";
import beeWaldo from "./assets/beeWaldo.jpeg";
import "./App.css";
import imageURL from "./assets/Easy.jpeg";

function App() {
  const [count, setCount] = useState(0);
  const [clickLocation, setClickLocation] = useState<number[]>([0, 0]);
  const [isFirstClickDone, setIsFirstClickDone] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [boxes, setBoxes] = useState([]);

  // function addSelectedMarker(clickLocation: number[]) {
  //   const selectedMarker = document.createElement("selectedMarker");
  //   selectedMarker.classList.add("marker");
  //   selectedMarker.classList.add("selected");

  //   selectedMarker.style.position = "absolute";
  //   selectedMarker.style.left = clickLocation[0] + "px";
  //   selectedMarker.style.top = clickLocation[1] + "px";

  //   document.body.appendChild(selectedMarker);
  // }

  function Marker() {
    if (isFirstClickDone && isSelected) {
      console.log(clickLocation);
      return (
        <div
          className="marker selected z-10"
          style={{
            position: "relative",
            left: clickLocation[0] - 30 + "px",
            top: clickLocation[1] - 30 + "px",
          }}
        ></div>
      );
    }
  }

  function PopUpMenu() {
    if (isSelected) {
      return (
        <div
          id="popUpMenu"
          className=" w-1/12 aspect-square p-1 bg-white grid grid-cols-2 gap-1  border-2 border-neutral-700 rounded-lg "
          style={{
            position: "absolute",
            left: clickLocation[0] + 30 + "px",
            top: clickLocation[1] + 30 + "px",
          }}
        >
          <img
            src={waldo}
            alt="Waldo"
            className="border h-full w-full hover:border-neutral-700 rounded-md opacity-30 hover:opacity-100"
          />
          <img
            src={wendy}
            alt="wendy"
            className="border h-full w-full hover:border-neutral-700 rounded-md opacity-30 hover:opacity-100"
          />
          <img
            src={wizard}
            alt="wizard"
            className="border h-full w-full hover:border-neutral-700 rounded-md opacity-30 hover:opacity-100"
          />
          <img
            src={beeWaldo}
            alt="beeWaldo"
            className="border h-full w-full hover:border-neutral-700 rounded-md opacity-30 hover:opacity-100"
          />
        </div>
      );
    }
  }

  return (
    <>
      <div className="setWidth h-full">
        <div id="navBar" className="card sticky top-0 left-0 bg-slate-300 z-40">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <div className="relative setWidth">
          <Marker />
          <img
            src={imageURL}
            alt="img"
            id="mainImage"
            className="setWidth absolute top-0 left-0 z-0"
            onClick={(e) => {
              setClickLocation([
                e.pageX,
                e.pageY - document.getElementById("navBar")?.offsetHeight,
              ]);

              setIsFirstClickDone(true);
              isSelected ? setIsSelected(false) : setIsSelected(true);
            }}
          />
          <PopUpMenu />
        </div>
      </div>
    </>
  );
}

export default App;
