import { useState, useEffect } from "react";
import "./App.css";

function Leaderboard() {
  useEffect(() => {
    fetch("http://localhost:3000/leaderboard")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.status);
        console.log(data);
        setPosts(data);
      })
      .catch(() => {
        setIsServerOk(false);
      });
  }, []);

  return <></>;
}

export default Leaderboard;
