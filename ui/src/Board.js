import React, { useState, useEffect } from "react";

import io from "socket.io-client";

import Deck from "./components";

//const apiUrl = `https://lit-stream-81562.herokuapp.com`;
const apiUrl = `http://localhost:8000`;
const socket = io(apiUrl);

const Board = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Component update");

  useEffect(() => {
    socket.on("update", (cards) => {
      console.log("update cards");
      setCards(cards);
      setLoading(false);
    });

    socket.emit("update");

    socket.on("connect", (content) =>
      console.log(`connect to server : ${content}`)
    );

    return () => socket.close();
  }, []);

  const changeSpymaster = (e) => {
    e.preventDefault();
    setIsSpymaster(!isSpymaster);
  };

  const changeCards = (e) => {
    e.preventDefault();
    socket.emit("change cards");
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    if (!cards[id].isPlayed) {
      let newCards = [...cards];
      newCards[id].isPlayed = true;
      setCards(cards);
      console.log("clic");

      socket.emit("choose word", id);
    }
  };

  if (loading) return <div>cards Loading...</div>;

  return (
    <>
      <Deck cards={cards} isSpymaster={isSpymaster} onClick={handleClick} />

      <div>
        Spymaster :
        <button onClick={changeSpymaster}>{isSpymaster ? "ON" : "OFF"}</button>
      </div>
      <div>
        <button onClick={changeCards}>Nouvelle Partie</button>
      </div>
    </>
  );
};

export default Board;
