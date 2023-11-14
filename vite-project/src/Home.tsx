import waldo from "./assets/waldo.jpeg";
import wendy from "./assets/wendy.jpeg";
import wizard from "./assets/wizard.jpeg";
import odlaw from "./assets/odlaw.jpeg";
import easyMap from "./assets/Easy.jpeg";
import mediumMap from "./assets/Medium.jpeg";
import hardMap from "./assets/hard.jpeg";
import "./Home.css";

function Home() {
  interface DifficultyProps {
    difficulty: string;
  }

  function GameSelectionPanel({ difficulty }: DifficultyProps) {
    let map = null;
    if (difficulty == "easy") {
      map = easyMap;
    } else if (difficulty == "medium") {
      map = mediumMap;
    } else {
      map = hardMap;
    }

    return (
      <>
        <div className="flex flex-col">
          <a href={`/game/${difficulty}`}>
            <div
              className="selectionMap w-64 h-96 mr-3 border-black border-2 rounded-3xl opacity-50 hover:opacity-100"
              style={{ backgroundImage: "url(" + map + ")" }}
            ></div>
            <div className="text-center font-extrabold text-xl">
              {difficulty}
            </div>
          </a>
        </div>
      </>
    );
  }

  function CharacterPanel(
    { img }: { img: string },
    { name }: { name: string }
  ) {
    return (
      <>
        <div className="flex flex-col items-center">
          <img
            className=" border-black border rounded-xl mr-3 w-25 h-25"
            src={img}
            alt={name}
          />
          <div className="font-bold">{name}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col p-3 text-lg">
        <div> Welcome! This website is a project from The Odin Project.</div>
        <div>
          Select any difficulty and start looking for Waldo, Wenda, Wizard and
          Odlaw!
        </div>
        <div>Feel free to zoom and pan to find them!</div>
        <div>
          Once you find them all, you can put yourself on the leaderboard!{" "}
        </div>
        <div> Check out the leaderboard for best records!</div>

        <div className="mt-10 flex flex-col w-fit ">
          <div className="mx-auto mb-2 font-bold text-lg">
            Find these people!
          </div>
          <div className="flex flex-row self-center justify-self-center w-fit">
            <CharacterPanel img={waldo} name="waldo" />

            <img
              className=" border-black border rounded-xl mr-3 w-25 h-25"
              src={wendy}
              alt="wendy"
            />
            <img
              className=" border-black border rounded-xl mr-3 w-25 h-25"
              src={wizard}
              alt="wizard"
            />
            <img
              className=" border-black border rounded-xl mr-3 w-25 h-25"
              src={odlaw}
              alt="odlaw"
            />
          </div>

          <div className="mx-auto mt-10 mb-2 font-bold text-lg">
            Select a game to play!
          </div>
          <div id="gameSelectionDiv" className="flex flex-row w-fit ">
            <GameSelectionPanel difficulty={"easy"} />
            <GameSelectionPanel difficulty={"medium"} />
            <GameSelectionPanel difficulty={"hard"} />
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}

export default Home;
