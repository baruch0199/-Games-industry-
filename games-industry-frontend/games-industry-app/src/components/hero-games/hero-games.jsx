import { useAuth } from "../contexts/auth-context";
import feedback from "../feedback";
import headerGames from "../games-the-source/array-of-games-for-header-games";
import { CartContext } from "../contexts/cart-context";
import { useContext } from "react";

const HeroGames = ({
  game: { title, description, _id, image, color, link, imageLink },
}) => {
  const { user } = useAuth();
  const games = headerGames();

  const { addProductToCart } = useContext(CartContext);

  return (
    <div className="hero-content">
      <img className="hero-image" src={image} alt={title} />
      <div className="hero-title-description-button-wrapper">
        <div className="hero-title-description-button">
          <h1 style={{ color: color }} className="hero-title">
            {title}
          </h1>
          <p style={{ color: color }} className="hero-description">
            {description}
          </p>
          <button
            className="hero-button"
            onClick={() => {
              if (!user()) {
                feedback(
                  "No products in the cart. You must sign in. If you have no account, sign up",
                  10000
                );
                return;
              }
              addProductToCart(_id, games);
              feedback("Added to the Cart", 5000);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="hero-image-link">
        <a className="hero-link" href={imageLink}>
          {link}
        </a>
      </div>
    </div>
  );
};

export default HeroGames;
