import { useState, useEffect } from "react";
import "./leaderboard.css";

function Leaderboard() {
  const [isDataRetrieved, setIsDataRetrieved] = useState(false);
  const [isServerOk, setIsServerOk] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/leaderboard")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLeaderboardData(data);
      })
      .then(() => {
        console.log(leaderboardData);
        setIsDataRetrieved(true);
        setIsServerOk(true);
      })
      .catch(() => {
        console.log("didnt work");
        setIsServerOk(false);
      });
  }, []);

  function SingleLeaderboard({ difficulty }: { difficulty: string }) {
    if (!isServerOk || !isDataRetrieved) return <></>;

    const SingleLeaderboardData = leaderboardData[difficulty + "Scores"];
    return (
      <>
        <div className="container ">
          <div className="mb-5 text-center font-extrabold text-3xl">
            {difficulty}
          </div>
          <table className="mx-10">
            <tr>
              <th>rank</th>
              <th>name</th>
              <th>time (m:s)</th>
            </tr>
            {SingleLeaderboardData.map((item: any, index: number) => (
              <tr className="">
                <td className="px-4 py-1">{index + 1}</td>
                <td className="px-4 py-1">{item.name}</td>
                <td className="px-4 py-1">
                  {item.duration.minutes}:{item.duration.seconds}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row w-fit overflow-auto mt-10 ml-10">
        <SingleLeaderboard difficulty={"easy"} />
        <SingleLeaderboard difficulty={"medium"} />
        <SingleLeaderboard difficulty={"hard"} />
      </div>
    </>
  );
}

export default Leaderboard;
