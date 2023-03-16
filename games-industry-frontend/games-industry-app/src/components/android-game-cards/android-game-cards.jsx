import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";
import deleteGameFront from "../delete-game-front";
import { useAuth } from "../contexts/auth-context";
import feedback from "../feedback";
import showEditGameInfo from "../show-edit-game-info";
import showGameInfo from "../show-game-info";
import productService from "../../services/main-page-producs-service-tools-for-admin";
import { useContext } from "react";
import { MoreInfoContext } from "../contexts/more-info-context";
import { CartContext } from "../contexts/cart-context";

const AndroidGameCards = ({
  game: { title, _id, image, worth, description, published_date },
  setGameMoreInfo,
  setGameInfo,
  setIsVIsable,
  shortTitle,
  shortDescription,
  androidGames,
  setAndroidGames,
}) => {
  const { user } = useAuth();
  const admin = user() ? user().admin : null;

  const { setIsMoreInfoVisible } = useContext(MoreInfoContext);

  const { addProductToCart } = useContext(CartContext);

  const addProductToCartHandler = (id, androidGames) => {
    if (!user()) {
      feedback(
        "No products in the cart. You must sign in. If you have no account, sign up",
        10000
      );
      return;
    }
    addProductToCart(id, androidGames);
    feedback("Added to the shopping cart", 5000);
  };

  const deleteGameHandler = (id, androidGames, setAndroidGames) => {
    productService.deleteOneDB(id);
    deleteGameFront(id, androidGames, setAndroidGames);
  };

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

  return (
    <div className="android-section-content">
      <div className="android-content android-height w-100">
        <img className="android-image" src={image} alt={title} />
        {admin && (
          <div className="android-bg-edit-delete-tools">
            <div className="android-edit-delete-tools">
              <button
                className="android-edit"
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
                <div className="android-pencil bi bi-pencil"></div>
              </button>

              <button
                className="android-trash"
                onClick={() =>
                  deleteGameHandler(_id, androidGames, setAndroidGames)
                }
              >
                <div className="android-trash bi bi-trash"></div>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="android-background">
        <div className="android-text-content">
          <h6 className="my-1 android-text-title">{shortTitle}</h6>
          <p className="android-paragraph-content">{shortDescription}</p>
          <button
            className="android-more-button"
            onClick={() =>
              showGameInfoHandler(title, description, published_date, _id, {
                setGameMoreInfo,
                setIsMoreInfoVisible,
              })
            }
          >
            <span className="android-more">more</span>
          </button>
        </div>
        <div className="android-button-and-price">
          <input
            className="android-button"
            type="button"
            name="button"
            id=""
            value={"Add to cart"}
            onClick={() => addProductToCartHandler(_id, androidGames)}
          />
          <div className="android-product-price">price: {worth}</div>
        </div>
      </div>
    </div>
  );
};

export default AndroidGameCards;
