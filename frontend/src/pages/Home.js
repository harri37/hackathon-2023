import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className="Home">
      <Title />
      <StartButton />
    </div>
  );
}

export default Home;
