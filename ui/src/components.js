import React from "react";

const Card = ({ card, isSpymaster, onClick }) => {
  const playedColor = `played-${card.color}`;
  const spyColor = `spy-${card.color}`;
  const className = `card ${isSpymaster ? spyColor : ""} ${
    card.isPlayed ? playedColor : ""
  }`;

  return (
    <button
      className={className}
      type="button"
      onClick={(e) => onClick(e, card.id)}
    >
      {card.word.toUpperCase()}
    </button>
  );
};

const Deck = ({ cards, isSpymaster, onClick }) =>
  cards.map((card) => (
    <Card
      key={card.id}
      card={card}
      isSpymaster={isSpymaster}
      onClick={onClick}
    />
  ));

export default Deck;
