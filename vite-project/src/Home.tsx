import waldo from "./assets/waldo.jpeg";
import wendy from "./assets/wendy.jpeg";
import wizard from "./assets/wizard.jpeg";
import odlaw from "./assets/odlaw.jpeg";
import easyMap from "./assets/Easy.jpeg";
import mediumMap from "./assets/Medium.jpeg";
import hardMap from "./assets/hard.jpeg";

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
            <div>{difficulty}</div>
            <img src={map} alt={difficulty} className="w-10 h-10" />
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div>welcome!</div>
        <div> provide context</div>
        <div>time tracked</div>
        <div>go to leaderboard for best times</div>
        <div>link to github</div>

        <div>
          <div>look for these characters</div>
          <div className="flex flex-row">
            <img src={waldo} alt="waldo" />
            <img src={wendy} alt="wendy" />
            <img src={wizard} alt="wizard" />
            <img src={odlaw} alt="odlaw" />
          </div>
        </div>

        <div id="gameSelectionDiv" className="flex flex-row">
          <GameSelectionPanel difficulty={"easy"} />
          <GameSelectionPanel difficulty={"medium"} />
          <GameSelectionPanel difficulty={"hard"} />
        </div>

        <div>
          <a href="/leaderboard"> leaderboard</a>
        </div>
      </div>
    </>
  );
}

export default Home;
