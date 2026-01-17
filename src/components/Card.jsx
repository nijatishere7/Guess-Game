export const Card = ({ card, handleSelected, rotated, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleSelected(card);
    }
  };

  return (
    <div className="card">
      <div className={rotated ? "rotated" : ""}>
        <img className="w-35 h-35 front" src={card.img} />
        <img
          onClick={() => handleClick()}
          className="w-35 h-35 back"
          src="question.png"
        />
      </div>
    </div>
  );
};
