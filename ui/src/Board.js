import React, { useState, useEffect } from "react";

import Deck from "./components";
import { get, post } from "./utils/fetch";

const Board = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDeal, setNewDeal] = useState(false);
  const [blockUpdate, setBlockUpdate] = useState(false);
  const [countGets, setCountGets] = useState(0);
  const [firstPostOk, SetFirstPostOk] = useState(false);

  //const apiUrl = `https://lit-stream-81562.herokuapp.com/api`;
  const apiUrl = `http://localhost:5000/api`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!blockUpdate) {
        setCountGets((count) => count + 1);
        console.log(`envoi get (count=${countGets})`);

        get(apiUrl).then((newCards) => {
          setCountGets((count) => count - 1);
          console.log(`retour get (count=${countGets})`);

          if (JSON.stringify(newCards) !== JSON.stringify(cards)) {
            console.log(JSON.stringify(newCards[0]));
            console.log(JSON.stringify(cards[0]));

            console.log("Nouvelles cartes reçues!");
            setCards(newCards);
            setLoading(false);
            SetFirstPostOk(true);
          }
        });
      }
    }, 200);
    return () => clearInterval(interval);
  }, [apiUrl, blockUpdate, countGets, cards]);

  useEffect(() => {
    if (countGets === 0 && firstPostOk) {
      setBlockUpdate(true);
      console.log(`envoi post (count=${countGets})`);
      post(apiUrl, cards).then(() => {
        setBlockUpdate(false);
      });
      console.log(`retour post (count=${countGets})`);
    }
  }, [cards, apiUrl, firstPostOk]);

  useEffect(() => {
    if (newDeal) {
      get(`${apiUrl}/new-deal`).then((cards) => {
        setCards(cards);
        setIsSpymaster(false);
        setNewDeal(false);
      });
    }
  }, [newDeal, apiUrl]);

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
