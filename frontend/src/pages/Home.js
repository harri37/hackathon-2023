import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  function Title() {
    return <h1 className="Title">Rizz</h1>;
  }

  function StartButton() {
    return (
      <Link to="/game" className="StartButton">
        Begin
      </Link>
    );
  }

  function Music() {
    return (
      <audio loop>
        <source src={require("../music/nice.mp3")} type="audio/mpeg" />
      </audio>
    );
  }

  return (
    <div className="Home">
      <Music />
      <Title />
      <StartButton />
    </div>
  );
}

export default Home;
