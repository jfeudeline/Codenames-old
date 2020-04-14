import React, { useState, useEffect } from "react";
import BoardGame from "./components";
import { get } from "./utils/fetch";

const App = () => {
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("http://localhost:5000/api").then((cards) => {
      setLoading(false);
      setCards(cards);
    });
  }, []);

  const changeSpymaster = (e) => {
    e.preventDefault();
    setIsSpymaster(!isSpymaster);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    let new_cards = [...cards];
    new_cards[id].isPlayed = true;
    setCards(new_cards);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Codenames</h1>
      <BoardGame
        cards={cards}
        isSpymaster={isSpymaster}
        onClick={handleClick}
      />
      <div>
        Spymaster :
        <button onClick={changeSpymaster}>{isSpymaster ? "ON" : "OFF"}</button>
      </div>
    </>
  );
};

export default App;
