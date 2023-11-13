import { useState } from "react";
import waldo from "./assets/waldo.jpeg";
import wendy from "./assets/wendy.jpeg";
import wizard from "./assets/wizard.jpeg";
import odlaw from "./assets/odlaw.jpeg";
import easyMap from "./assets/Easy.jpeg";
import mediumMap from "./assets/Medium.jpeg";
import hardMap from "./assets/hard.jpeg";
import closeIcon from "./assets/close-svgrepo-com.svg";

import "./Game.css";
import { useNavigate, useParams } from "react-router-dom";

function Game() {
  const { difficulty } = useParams();
  const [duration, setDuration] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinPopUpOn, setIsWinPopUpOn] = useState(false);
  const [count, setCount] = useState(0);
  const [clickLocation, setClickLocation] = useState<number[]>([0, 0]);
  const [isFirstClickDone, setIsFirstClickDone] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState([
    { name: "waldo", img: waldo, selected: false },
    { name: "wendy", img: wendy, selected: false },
    { name: "wizard", img: wizard, selected: false },
    { name: "odlaw", img: odlaw, selected: false },
  ]);
  const navigate = useNavigate();

  // setTimeout(() => {
  //   if (!isGameWon) setElapsedTime(elapsedTime + 1);
  // }, 1000);

  function ElapsedTime() {
    return (
      <>
        <div>{duration}</div>
      </>
    );
  }

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

  function updateIsGameWon() {
    for (const character of characters) {
      if (!character.selected) return;
    }
    setIsGameWon(true);
  }

  function PopUpMenu() {
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
          onClick={() => {
            checkLocation(character.name);
            updateIsGameWon();
          }}
        />
      ));
    }

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
      gameImg = hardMap;
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

  function handleScoreSubmit(e: any) {
    e.preventDefault();
    const tempJSON = JSON.stringify({
      name: name,
      duration: {
        seconds: duration % 60,
        minutes: Math.floor(duration / 60),
        total_seconds: duration,
      },
      difficulty: difficulty,
    });
    fetch(`http://localhost:3000/leaderboard/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tempJSON,
    }).then(() => {
      setName("");
      setIsGameWon(false);
      setIsWinPopUpOn(false);

      navigate("/");
    });
  }

  function PopUpGameWon() {
    // if (!isGameWon && !isWinPopUpOn) return;
    return (
      <>
        <div className="fixed w-full h-full bg-black opacity-60 z-50"></div>
        <div className="centered fixed bg-white border-4 border-black w-fit h-fit  z-50 flex flex-col justify-center items-center p-3 ">
          <img
            className="w-5 h-5 static ml-auto mb-auto hover:cursor-pointer"
            src={closeIcon}
            alt=""
            onClick={() => setIsWinPopUpOn(false)}
          />
          <div className="flex flex-col items-center p-3 w-full">
            <div className="mb-5">Congratulations, you won!</div>
            <div>Your time is: </div>
            <div className="text-3xl">{duration}</div>
            <div className="mt-5 mb-3 text-center">
              Enter yourself in the leader board
            </div>
            <form onSubmit={(e) => handleScoreSubmit(e)}>
              <div className="flex flex-row items-center justify-center px-3 ">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name for leaderboard"
                  className="mr-3  p-1 w-full border border-black"
                />
                <input
                  className="winPopUpButton py-1 px-2 hover:cursor-pointer"
                  type="submit"
                  value="submit"
                />
              </div>
            </form>
            <div>
              <div className="flex flex-row mt-5"></div>
              <button className="winPopUpButton mr-4 px-6 py-1">Home</button>
              <button className="winPopUpButton px-6 py-1">Replay</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {PopUpGameWon()}
      <div className="setWidth h-full">
        <div id="navBar" className="card sticky top-0 left-0 bg-slate-300 z-40">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <ElapsedTime />
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
