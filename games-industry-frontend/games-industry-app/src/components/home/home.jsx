import { Pc } from "../pc/pc";
import { Android } from "../android/android";
import Playstation from "../playstation/playstation";
import Ios from "../ios/ios";
import games from "../games-the-source/array-of-games-for-main-section";
import { useState } from "react";
import productService from "../../services/main-page-producs-service-tools-for-admin";
import { useAuth } from "../contexts/auth-context";
import { useContext } from "react";
import { MoreInfoContext } from "../contexts/more-info-context";

const Home = () => {
  const [gameMoreInfo, setGameMoreInfo] = useState({
    title: "",
    _id: "",
    description: "",
    published_date: "",
  });
  const [gameInfo, setGameInfo] = useState({
    title: "",
    _id: "",
    description: "",
    published_date: "",
  });
  const [updatedGame, setUpdatedGame] = useState();

  const editTitle = (e) => {
    const newInfo = {
      _id: gameInfo._id,
      title: e.target.value,
    };
    setUpdatedGame({ ...updatedGame, ...newInfo });
  };

  const editDescription = (e) => {
    const newInfo = {
      _id: gameInfo._id,
      description: e.target.value,
    };
    setUpdatedGame({ ...updatedGame, ...newInfo });
  };

  const editDate = (e) => {
    const newInfo = {
      _id: gameInfo._id,
      published_date: e.target.value,
    };
    setUpdatedGame({ ...updatedGame, ...newInfo });
  };

  const editGame = async () => {
    const response = await productService.editProduct(updatedGame);
    window.location.reload();
  };

  const { user } = useAuth();
  const admin = user() ? user().admin : null;

  const { isMoreInfoVisible, setIsMoreInfoVisible, moreInfoStyles } =
    useContext(MoreInfoContext);

  const [isVIsable, setIsVIsable] = useState();
  const editStyle = {
    visibility: isVIsable ? "visible" : "hidden",
    opacity: isVIsable ? 0.95 : 0,
    transition: isVIsable && "1s",
  };

  const createGames = () => {
    games.map((game) => productService.createProductsMainSection(game));
  };

  return (
    <div className="main-page-container">
      {admin && (
        <div className="create-products-wrapper">
          <button className="create-products" onClick={() => createGames()}>
            Create games
          </button>
        </div>
      )}

      <h3 className="title-pc-games">PC GAMES</h3>
      <Pc
        setGameMoreInfo={setGameMoreInfo}
        setIsVIsable={setIsVIsable}
        setGameInfo={setGameInfo}
      />
      <h3 className="title-android-games mt-5">ANDROID GAMES</h3>
      <Android
        setGameMoreInfo={setGameMoreInfo}
        setIsVIsable={setIsVIsable}
        setGameInfo={setGameInfo}
      />
      <h3 className="playstation-title-games text-white mx-5 mb-4 mt-5">
        PLAYSTATION 4 GAMES
      </h3>
      <Playstation
        setGameMoreInfo={setGameMoreInfo}
        setIsVIsable={setIsVIsable}
        setGameInfo={setGameInfo}
      />
      <h3 className="ios-title-games">IOS GAMES</h3>
      <Ios
        setGameMoreInfo={setGameMoreInfo}
        setIsVIsable={setIsVIsable}
        setGameInfo={setGameInfo}
      />

      {admin && (
        <div style={{ ...editStyle }} className="edit">
          <div className="edit-content-wrapper">
            <div>
              <button className="edit-exit" onClick={() => setIsVIsable(false)}>
                <div className="edit-exit-icon"></div>
              </button>
            </div>
            <div className="edit-text">
              <input
                type="text"
                className="edit-title"
                onChange={(e) => editTitle(e, gameInfo.title)}
                defaultValue={gameInfo.title}
              />

              <input
                type="text"
                className="edit-description"
                onInput={(e) => editDescription(e)}
                defaultValue={gameInfo.description}
              />

              <input
                type="text"
                className="edit-published-date"
                onInput={(e) => editDate(e)}
                defaultValue={gameInfo.published_date}
              />
            </div>
            <button
              className="edit-save"
              onClick={() => {
                editGame();
                setIsVIsable(false);
              }}
            >
              save
            </button>
          </div>
        </div>
      )}

      <div style={{ ...moreInfoStyles }} className="more-info">
        <div className="more-info-content-wrapper">
          <div>
            <button
              className="more-info-exit"
              onClick={() => setIsMoreInfoVisible(false)}
            >
              <div className="more-info-exit-icon"></div>
            </button>
          </div>
          <div className="more-info-text">
            <h1 className="more-info-title">{gameMoreInfo.title}</h1>
            <p>{gameMoreInfo.description}</p>
            <p className="">
              {"date released: " + gameMoreInfo.published_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
