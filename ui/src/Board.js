import React, { useState, useEffect } from "react";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.js";

import io from "socket.io-client";

import Deck from "./components";

const url = window._env_.BASE_API_URL || process.env.REACT_APP_BASE_API_URL;

const socket = io(url);

const Board = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("passage dans useEffect");

    console.log(socket);

    socket.open();

    socket.on("connect", (content) =>
      console.log(`connect to server : ${content}`)
    );

    console.log(socket);

    socket.on("update", (cards) => {
      console.log("update cards");
      setCards(cards);
      setLoading(false);
    });

    socket.emit("update");

    return () => {
      socket.close();
      console.log("déconnexion au serveur");
    };
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

  return (
    <>
      {loading ? (
        <div>cards Loading...</div>
      ) : (
        <Deck cards={cards} isSpymaster={isSpymaster} onClick={handleClick} />
      )}

      <div>
        Spymaster :
        <button onClick={changeSpymaster}>{isSpymaster ? "ON" : "OFF"}</button>
      </div>
      <div>
        <button onClick={changeCards}>Nouvelle Partie</button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            ReasonReactRouter.push("/");
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    </>
  );
};

export default Board;
