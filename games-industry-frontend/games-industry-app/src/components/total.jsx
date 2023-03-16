const Total = ({ cartProducs }) => {
  const toInitialValue = 0;
  const totalPrice = [...cartProducs].reduce((initialValue, game) => {
    return initialValue + Number(game.worth.replace("$", ""));
  }, toInitialValue);

  return <div className="products-total">Total : {totalPrice}$</div>;
};

export default Total;
