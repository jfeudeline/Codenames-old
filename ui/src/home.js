import React, { useState, useEffect } from "react";
import { getText, get } from "./utils/fetch";
import { useHistory } from "react-router-dom";

const NewGameButton = () => {
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(true);
  const [nGames, setNGames] = useState(0);
  let history = useHistory();

  useEffect(() => {
    setLoading(false);
  }, [nGames]);

  const handleClick = (e) => {
    //get("https://lit-stream-81562.herokuapp.com/api").then((cards) => {
    getText("http://localhost:5000/api/new-game").then((id) => {
      setGameId(id);
      setNGames(nGames + 1);
      history.push(`/${id}`);
    });
  };

  if (loading) return <div>id loading...</div>;
  return <button onClick={handleClick}>New game</button>;
};

const AllGamesList = () => {
  const gamesUrl = "http://localhost:5000/api";
  const [games, setGames] = useState([]);
  let history = useHistory();

  useEffect(() => {
    get(gamesUrl).then((game) => {
      setGames(game);
    });
  }, [gamesUrl]);

  const handleClick = (id) => {
    history.push(`/${id}`)
  }

  return(
    <div class="all-games">
      <h3>Toutes les parties disponibles :</h3>
      <ul>
        {games.map(id => <li><button onClick={() => handleClick(id)}>{id}</button></li>)}
      </ul>
    </div>
  )
}

export const Home = () => {
  return (
    <>
      <NewGameButton />
      <AllGamesList/>
    </>
  );
};
