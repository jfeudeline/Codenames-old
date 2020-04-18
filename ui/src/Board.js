import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Deck from "./components";
import { get } from "./utils/fetch";

//const apiUrl = `https://lit-stream-81562.herokuapp.com/api`;
const apiUrl = `http://localhost:5000`;
const socket = socketIOClient(apiUrl);

const Board = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDeal, setNewDeal] = useState(false);

  useEffect(() => {
    if (loading) {
      get(`${apiUrl}/api`).then((cards) => {
        console.log(JSON.stringify(cards[0]));
        setCards(cards);

        socket.on("message", (newCards) => {
          const isChange = JSON.stringify(newCards) !== JSON.stringify(cards);
          console.log(JSON.stringify(newCards));
          console.log(JSON.stringify(cards));
          console.log(isChange);
          if (isChange) {
            setCards(newCards);
          }
        });

        setLoading(false);
      });
    } else {
      socket.emit("message", cards);
    }
  }, [cards]);

  useEffect(() => {
    if (newDeal) {
      get(`${apiUrl}/api/new-deal`).then((cards) => {
        setCards(cards);
        setIsSpymaster(false);
        setNewDeal(false);
      });
    }
  }, [newDeal]);

  const changeSpymaster = (e) => {
    e.preventDefault();
    setIsSpymaster(!isSpymaster);
  };

  const changeCards = (e) => {
    e.preventDefault();
    setNewDeal(true);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    if (!cards[id].isPlayed) {
      let new_cards = [...cards];
      new_cards[id].isPlayed = true;
      setCards(new_cards);
    }
  };

  if (loading) return <div>cards Loading...</div>;
  if (cards === undefined) return <div>Cet URL n'existe pas</div>;

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
