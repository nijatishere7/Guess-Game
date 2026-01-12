import "./App.css";
import { FaLightbulb } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";

export const App = () => {
  const defaultCards = [
    {
      img: "public/images/apple.png",
      matched: false,
    },
    {
      img: "public/images/banana.png",
      matched: false,
    },
    {
      img: "public/images/orange.png",
      matched: false,
    },
    {
      img: "public/images/grapes.png",
      matched: false,
    },
    {
      img: "public/images/strawberry.png",
      matched: false,
    },
    {
      img: "public/images/peach.png",
      matched: false,
    },
    {
      img: "public/images/pomegranate.png",
      matched: false,
    },
    {
      img: "public/images/pear.png",
      matched: false,
    },
    {
      img: "public/images/lemon.png",
      matched: false,
    },
    {
      img: "public/images/pineapple.png",
      matched: false,
    },
    {
      img: "public/images/cherry.png",
      matched: false,
    },
    {
      img: "public/images/avocado.png",
      matched: false,
    },
  ];

  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const prepareCards = () => {
    const sortedCards = [...defaultCards, ...defaultCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    resetState();
  };

  const handleSelected = (card) => {
    if (disabled) return true;
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);

      if (selectedOne.img === selectedTwo.img) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === selectedOne.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  };

  return (
    <>
      <section className="bg-linear-to-r from-[#4b6cb7] to-[#182848] min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-semibold flex tracking-[2px] items-center justify-center gap-2 text-white ">
          <FaLightbulb className="text-yellow-400" />
          Guess Game <FaLightbulb className="text-yellow-400" />
        </h1>
        <div className="text-center mt-5">
          <button
            className="bg-green-600 font-semibold text-white py-4 px-6 rounded-md hover:bg-green-700 shadow-md transition-all"
            onClick={prepareCards}
          >
            New Game
          </button>
        </div>

        <div className="grid grid-cols-6 mt-12 gap-3 justify-center items-center">
          {cards.map((card, ind) => (
            <Card
              key={ind}
              card={card}
              disabled={disabled}
              handleSelected={handleSelected}
              rotated={
                card === selectedOne || card === selectedTwo || card.matched
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};
