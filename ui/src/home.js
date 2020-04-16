import React, { useState, useEffect } from "react";
import { getText, get } from "./utils/fetch";
import { useHistory } from "react-router-dom";

const NewGameButton = () => {
  //const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(true);
  const [nGames, setNGames] = useState(0);
  let history = useHistory();

  useEffect(() => {
    setLoading(false);
  }, [nGames]);

  const handleClick = (e) => {
    //get("https://lit-stream-81562.herokuapp.com/api").then((cards) => {
    getText("http://localhost:5000/api/new-game").then((id) => {
      //setGameId(id);
      setNGames(nGames + 1);
      history.push(`/${id}`);
    });
  };

  if (loading) return <div>id loading...</div>;
  return <button onClick={handleClick}>New game</button>;
};

/*
 * Composant React permettant de récupérer la liste de toutes les parties
 * et l'utilisateur peut rejoindre une partie en appuyant sur le bouton. 
 */
const AllGamesList = () => {
  const gamesUrl = "http://localhost:5000/api";
  const [games, setGames] = useState([]);
  let history = useHistory();

  useEffect(() => {
    // Requete automatique pour mettre à jour les parties en cours (utile ?)
    /*
    setInterval(() => {
      get(gamesUrl).then((games) => {
        setGames(games);
      })}, 1000);
    */
    
    // On récupère la liste de toutes parties
    get(gamesUrl).then((games) => {
      setGames(games);
   });
  }, [gamesUrl]);
  
  // Renvoi l'utilisateur vers la partie choisie
  const handleClick = (id) => {
    history.push(`/${id}`)
  }

  return(
    <div className="all-games">
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
