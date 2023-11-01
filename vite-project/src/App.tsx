import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import imageURL from "./assets/Difficult.jpeg";

function App() {
  const [count, setCount] = useState(0);
  const [clickLocation, setClickLocation] = useState<number[]>([0, 0]);
  const isFirstClickDone = useRef(false);
  const isSelected = useState(false);
  const [boxes, setBoxes] = useState([]);
  
  const handleClick = ({ pageX, pageY }) => {
    // on every click push a new coordinate to the boxes array
    setBoxes((boxes) => [...boxes, { x: pageX, y: pageY }]);
  };

  return (
    <div className="app" onClick={handleClick}>
      // display boxes
      {boxes.map((box) => (
        // map coordinates to left and top
        <div className="box" style={{ left: box.x, top: box.y }}></div>
      ))}
    </div>
  );
}

  return (
    <>
      <div
        id="main"
        onClick={(e) => {
          if (document.getElementsByClassName("selected").length == 0) {
            setClickLocation([e.pageX, e.pageY]);
            addSelectedMarker(clickLocation);
            isFirstClickDone.current = true;
          } else {
            removeSelectedMarker();
          }
        }}
      >
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <img src={imageURL} alt="img" id="mainImage" className="workspace" />
      </div>
    </>
  );
}

export default App;
