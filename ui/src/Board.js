import React, { useState, useEffect } from "react";

import Deck from "./components";
import { get, post } from "./utils/fetch";
import { useParams } from "react-router-dom";

const Board = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDeal, setNewDeal] = useState(false);
  const { gameId } = useParams();
  const apiUrl = `http://localhost:5000/api/${gameId}`;
  //const apiUrl = `https://lit-stream-81562.herokuapp.com/api/${gameId}`;
  const newDealUrl = `http://localhost:5000/api/${gameId}/new-deal`;
  //const newDealUrl = `https://lit-stream-81562.herokuapp.com/api/${gameId}/new-deal`;

  const getCards = () => {
    get(apiUrl).then((cards) => {
      setLoading(false);
      setCards(cards);
    });
  }

  useEffect(() => {
    getCards();
    setInterval(getCards, 6 * 1000); // appel la fonction toutes les 2 sec
  }, [apiUrl]);

  useEffect(() => {
    post(apiUrl, cards);
  }, [cards, apiUrl]);

  useEffect(() => {
    if (newDeal) {
      get(newDealUrl).then((cards) => {
        setCards(cards);
        setNewDeal(false);
      });
    }
  }, [newDeal]);

  /*
   * Récupère l'état des cartes de la partie
   */
  

  const changeSpymaster = (e) => {
    e.preventDefault();
    setIsSpymaster(!isSpymaster);
  };

  const changeCards = (e) => {
    e.preventDefault();
    setIsSpymaster(false)
    setNewDeal(true);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    let new_cards = [...cards];
    new_cards[id].isPlayed = true;
    setCards(new_cards);
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
