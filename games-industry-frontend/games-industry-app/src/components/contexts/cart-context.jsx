import { createContext, useState, useEffect } from "react";
import productServiceUser from "../../services/product-service-tools-for-user";
import usersSerivce from "../../services/usersSerivce";

export const CartContext = createContext({
  cartProducs: [],
  cartCount: [],
  cartIconSize: null,
  doRender: null,
  setDoRender: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartProducs, setCartProducs] = useState([]);
  const [doRender, setDoRender] = useState(0);
  const [cartIconSize, setCartIconSize] = useState("");

  const clear = () => setCartIconSize("");

  ///
  useEffect(() => {
    if (!usersSerivce.getJwt()) {
      setCartProducs([]);
      return;
    }

    const getUserProducts = async () => {
      const { data } = await productServiceUser.getCartProducts();
      setCartProducs(data);
    };

    getUserProducts();
  }, [doRender]);
  ///
  const addProductToCart = (id, gamesPlatform) => {
    const gameArr = gamesPlatform.filter((game) => {
      return game._id == id;
    });

    const [gameObj] = gameArr;

    const { title, description, image, worth } = gameObj;

    const gameArrV2 = {
      title: title,
      description: description,
      worth: worth,
      image: image,
    };

    if (cartIconSize) {
      clear();
    }

    const newProductHanler = async () => {
      const response = await productServiceUser.createProduct(gameArrV2);
      setDoRender(doRender + 1);

      if (response.status == 201) {
        setCartIconSize("resize-cart-icon");
      }
    };

    newProductHanler();
  };
  ///

  const removeProductFromCart = (id) => {
    const deleteGame = async () => {
      await productServiceUser.deleteOne(id);
      setDoRender(doRender + 1);
    };
    deleteGame();
  };

  const renderNow = () => setDoRender(doRender + 1);

  const value = {
    cartProducs,
    setCartProducs,
    addProductToCart,
    removeProductFromCart,
    cartIconSize,
    doRender,
    setDoRender,
    renderNow,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
