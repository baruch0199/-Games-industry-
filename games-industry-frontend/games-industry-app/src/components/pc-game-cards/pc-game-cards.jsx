// import "./pc-game-cards.scss";
import deleteGameFront from "../delete-game-front";
import feedback from "../feedback";
import showEditGameInfo from "../show-edit-game-info";
import showGameInfo from "../show-game-info";
import productService from "../../services/main-page-producs-service-tools-for-admin";
import { useContext } from "react";
import { MoreInfoContext } from "../contexts/more-info-context";

import { CartContext } from "../contexts/cart-context";

import { useAuth } from "../contexts/auth-context";

const PcGameCards = ({
  game: { title, _id, image, worth, description, published_date },
  setGameInfo,
  setIsVIsable,
  setGameMoreInfo,
  shortTitle,
  shortDescription,
  pcGames,
  setPcGames,
}) => {
  const { user } = useAuth();
  const admin = user() ? user().admin : null;

  const { setIsMoreInfoVisible } = useContext(MoreInfoContext);

  const { addProductToCart } = useContext(CartContext);

  const addProductToCartHandler = (id, pcGames) => {
    if (!user()) {
      feedback(
        "No products in the cart. You must sign in. If you have no account, sign up",
        10000
      );
      return;
    }

    addProductToCart(id, pcGames);

    feedback("Added to the shopping Cart ", 5000);
  };

  const deleteGameHandler = (id, pcGames, setPcGames) => {
    deleteGameFront(id, pcGames, setPcGames);
    productService.deleteOneDB(id);
  };

  const showGameInfoHandler = (
    title,
    description,
    published_date,
    id,
    { setGameMoreInfo, setIsMoreInfoVisible }
  ) =>
    showGameInfo(title, description, published_date, id, {
      setGameMoreInfo,
      setIsMoreInfoVisible,
    });

  const showEditGameInfoHandler = (
    title,
    description,
    published_date,
    id,
    { setGameInfo, setIsVIsable }
  ) =>
    showEditGameInfo(title, description, published_date, id, {
      setGameInfo,
      setIsVIsable,
    });

  return (
    <div className="pc-section-content">
      <div className="pc-content pc-height w-100">
        <img className="pc-image" src={image} alt={title} />
        {admin && (
          <div className="pc-bg-edit-delete-tools">
            <div className="pc-edit-delete-tools">
              <button
                className="pc-edit"
                onClick={() =>
                  showEditGameInfoHandler(
                    title,
                    description,
                    published_date,
                    _id,
                    {
                      setGameInfo,
                      setIsVIsable,
                    }
                  )
                }
              >
                <div className="pc-pencil bi bi-pencil"></div>
              </button>
              <button
                className="pc-trash"
                onClick={() => deleteGameHandler(_id, pcGames, setPcGames)}
              >
                <div className="bi bi-trash"></div>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="pc-background">
        <div className="pc-text-content">
          <h6 className="my-1 pc-text-title">{shortTitle}</h6>
          <p className="pc-paragraph-content">{shortDescription}</p>
          <button
            className="pc-more-button"
            onClick={() =>
              showGameInfoHandler(title, description, published_date, _id, {
                setGameMoreInfo,
                setIsMoreInfoVisible,
              })
            }
          >
            <span className="pc-more">more</span>
          </button>
        </div>
        <div className="pc-button-and-price">
          <input
            className="pc-button"
            type="button"
            name="button"
            id=""
            value={"Add to cart"}
            onClick={() => addProductToCartHandler(_id, pcGames)}
          />
          <div className="pc-product-price">price: {worth}</div>
        </div>
      </div>
    </div>
  );
};

export default PcGameCards;
