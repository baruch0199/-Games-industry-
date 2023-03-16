import deleteGameFront from "../delete-game-front";

import { useAuth } from "../contexts/auth-context";

import feedback from "../feedback";
import showEditGameInfo from "../show-edit-game-info";
import showGameInfo from "../show-game-info";
import productService from "../../services/main-page-producs-service-tools-for-admin";

import { useContext } from "react";
import { MoreInfoContext } from "../contexts/more-info-context";
import { CartContext } from "../contexts/cart-context";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";

const IosGameCards = ({
  game: { title, _id, image, worth, description, published_date },
  setGameMoreInfo,
  setGameInfo,
  setIsVIsable,
  shortTitle,
  shortDescription,
  iosGames,
  setIosGames,
}) => {
  const { user } = useAuth();
  const admin = user() ? user().admin : null;
  const { setIsMoreInfoVisible } = useContext(MoreInfoContext);

  const { addProductToCart } = useContext(CartContext);

  const addProductToCartHandler = (id, iosGames) => {
    if (!user()) {
      feedback(
        "No products in the cart. You must sign in. If you have no account, sign up",
        10000
      );
      return;
    }
    addProductToCart(id, iosGames);
    feedback("Added to the shopping Cart", 5000);
  };

  const deleteGameHandler = (id, iosGames, setIosGames) => {
    deleteGameFront(id, iosGames, setIosGames);
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
    <>
      <button
        className="ios-more-button"
        onClick={() =>
          showGameInfoHandler(title, description, published_date, _id, {
            setGameMoreInfo,
            setIsMoreInfoVisible,
          })
        }
      >
        <span className="ios-more">more</span>
      </button>
      <div className="ios-background">
        {admin && (
          <div className="ios-bg-edit-delete-tools">
            <div className="ios-edit-delete-tools">
              <button
                className="ios-edit"
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
                <div className="ios-pencil bi bi-pencil"></div>
              </button>
              <button
                className="ios-trash"
                onClick={() => deleteGameHandler(_id, iosGames, setIosGames)}
              >
                <div className="ios-trash bi bi-trash"></div>
              </button>
            </div>
          </div>
        )}

        <div className="ios-image-wraper">
          <img className="ios-image" src={image} alt="" />
        </div>
        <div className="ios-wraper-text-button-price">
          <div className="ios-wraper-text">
            <div className="ios-text">
              <h5>{title}</h5>
              <p className="ios-paragraph">{description}</p>
            </div>
          </div>
          <div className="ios-button-and-price">
            <input
              className="ios-button"
              type="button"
              value="Add to cart"
              onClick={() => addProductToCartHandler(_id, iosGames)}
            />
            <span className="ios-price">price :{worth}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default IosGameCards;
