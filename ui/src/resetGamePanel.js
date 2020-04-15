import React, { useState, useEffect } from "react";
import { getText } from "./utils/fetch";
import { useHistory } from "react-router-dom";

const DisplayUrl = ({ gameId }) => {
  if (gameId === "") return <div />;
  return (
    <p>
      URL du jeu:{" "}
      <a href={`http://localhost:3000/${gameId}`}>
        http://localhost:3000/{gameId}
      </a>
    </p>
  );
};

const NewGameButton = () => {
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(true);
  const [nGames, setNGames] = useState(0);
  let history = useHistory();

  useEffect(() => {
    //get("https://lit-stream-81562.herokuapp.com/api").then((cards) => {
    getText("http://localhost:5000/api/new-game").then((id) => {
      setLoading(false);
      setGameId(id);
    });
  }, [nGames]);

  const handleClick = (e) => {
    setNGames(nGames + 1);
    history.push(`/${gameId}`);
  };

  if (loading) return <div>id loading...</div>;
  return <button onClick={handleClick}>New game</button>;
};

export const ResetGamePanel = ({ gameId }) => {
  return (
    <>
      <NewGameButton />
      <DisplayUrl gameId={gameId} />
    </>
  );
};
