import { useState, useEffect, useRef } from "react";
import waldo from "./assets/waldo.jpeg";
import wendy from "./assets/wendy.jpeg";
import wizard from "./assets/wizard.jpeg";
import odlaw from "./assets/odlaw.jpeg";
import easyMap from "./assets/Easy.jpeg";
import mediumMap from "./assets/Medium.jpeg";
import difficultMap from "./assets/Difficult.jpeg";

import "./Game.css";
import { useParams } from "react-router-dom";

function Game() {
  const { difficulty } = useParams();
  const [count, setCount] = useState(0);
  const [clickLocation, setClickLocation] = useState<number[]>([0, 0]);
  const [isFirstClickDone, setIsFirstClickDone] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [characters, setCharacters] = useState([
    { name: "waldo", img: waldo, selected: false },
    { name: "wendy", img: wendy, selected: false },
    { name: "wizard", img: wizard, selected: false },
    { name: "odlaw", img: odlaw, selected: false },
  ]);

  function SelectedMarker() {
    if (isFirstClickDone && isSelected) {
      console.log(clickLocation);
      return (
        <div
          className="marker selected"
          style={{
            left: clickLocation[0] - 30 + "px",
            top: clickLocation[1] - 30 + "px",
          }}
        ></div>
      );
    }
  }

  function addCorrectMarker() {
    const selectedMarker = document.createElement("div");
    selectedMarker.classList.add("marker");
    selectedMarker.classList.add("correct");
    selectedMarker.style.left = clickLocation[0] - 30 + "px";
    selectedMarker.style.top = clickLocation[1] - 30 + "px";
    document.getElementById("imgWrapper")?.appendChild(selectedMarker);
  }

  function checkLocation(characterName: string) {
    const tempJSON = JSON.stringify({
      x: clickLocation[0],
      y: clickLocation[1],
    });

    fetch(`http://localhost:3000/game/${difficulty}/${characterName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tempJSON,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data) {
          //set marker as green, and let user click next location
          addCorrectMarker();
          const tempCharacters = characters;
          const tempCharacter = tempCharacters.find(
            (character) => character.name == characterName
          );
          tempCharacter!.selected = true;
          setCharacters(tempCharacters);

          setIsSelected(false);
        } else {
          //alert user is incorrect, but with fade away notificaion
          alert("you made wrong selection");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function CharacterImages() {
    return characters.map((character) => (
      <img
        src={character.img}
        alt={character.name}
        className={
          character.selected
            ? "border h-full w-full  rounded-md opacity-30 "
            : "border border-white h-full w-full hover:border-neutral-700 rounded-md opacity-100"
        }
        onClick={() => checkLocation(character.name)}
      />
    ));
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
          <CharacterImages />
        </div>
      );
    }
  }

  function GameImage() {
    let gameImg;
    if (difficulty == "easy") {
      gameImg = easyMap;
    } else if (difficulty == "medium") {
      gameImg = mediumMap;
    } else {
      gameImg = difficultMap;
    }

    return (
      <img
        src={gameImg}
        alt="img"
        id="mainImage"
        className="setWidth absolute top-0 left-0 z-0"
        onClick={(e) => {
          setClickLocation([
            e.pageX,
            e.pageY - document.getElementById("navBar")!.offsetHeight,
          ]);

          setIsFirstClickDone(true);
          isSelected ? setIsSelected(false) : setIsSelected(true);
        }}
      />
    );
  }

  return (
    <>
      <div className="setWidth h-full">
        <div id="navBar" className="card sticky top-0 left-0 bg-slate-300 z-40">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <div id="imgWrapper" className="relative setWidth">
          <SelectedMarker />
          <GameImage />
          <PopUpMenu />
        </div>
      </div>
    </>
  );
}

export default Game;
