import deleteGameFront from "../delete-game-front";
import feedback from "../feedback";
import showEditGameInfo from "../show-edit-game-info";
import showGameInfo from "../show-game-info";
import productService from "../../services/main-page-producs-service-tools-for-admin";

import { useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";
import { useAuth } from "../contexts/auth-context";
import { MoreInfoContext } from "../contexts/more-info-context";

const PlaystationGameCards = ({
  game: { title, _id, image, worth, description, published_date },
  setGameInfo,
  setIsVIsable,
  shortTitle,
  shortDescription,
  setGameMoreInfo,
  playstationGames,
  setPlaystationGames,
}) => {
  const { user } = useAuth();
  const admin = user() ? user().admin : null;

  const { setIsMoreInfoVisible } = useContext(MoreInfoContext);

  const { addProductToCart } = useContext(CartContext);

  const addProductToCartHandler = (id, playstationGames) => {
    if (!user()) {
      feedback(
        "No products in the cart. You must sign in. If you have no account, sign up",
        10000
      );
      return;
    }
    addProductToCart(id, playstationGames);
    feedback("Added to the shopping Cart", 5000);
  };

  const deleteGameHandler = (id, playstationGames, setPlaystationGames) => {
    productService.deleteOneDB(id);
    deleteGameFront(id, playstationGames, setPlaystationGames);
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
    <div className="playstation-section-content">
      <div className="playstation-image-content ">
        <img className="playstation-image" src={image} alt={title} />
        {admin && (
          <div className="playstation-bg-edit-delete-tools">
            <div className="playstation-edit-delete-tools">
              <button
                className="playstation-edit"
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
                <div className="playstation-pencil bi bi-pencil"></div>
              </button>
              <button
                className="playstation-trash"
                onClick={() =>
                  deleteGameHandler(_id, playstationGames, setPlaystationGames)
                }
              >
                <div className="bi bi-trash"></div>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="playstation-text-content">
        <h6 className="playstation-title my-1">{shortTitle}</h6>
        <p className="playstation-paragraph-content">{shortDescription}</p>
        <button
          className="playstation-more-button"
          onClick={() =>
            showGameInfoHandler(title, description, published_date, _id, {
              setGameMoreInfo,
              setIsMoreInfoVisible,
            })
          }
        >
          <span className="pc-more">more</span>
        </button>
        <div className="playstation-button-and-price-wrapper">
          <div className="playstation-button-and-price">
            <input
              className="playstation-button"
              type="button"
              value="Add to cart"
              onClick={() => addProductToCartHandler(_id, playstationGames)}
            />
            <span className="playstation-price">price :{worth}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaystationGameCards;
