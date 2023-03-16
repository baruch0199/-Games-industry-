import filterPlatforms from "./filter-platforms";
import { useEffect, useState } from "react";
import { getProductsMainSection } from "../../services/main-page-producs-service-tools-for-admin";
const gameKey = "game";

const useBodyGames = () => {
 
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState([]);
  const [doRender, setDoRender] = useState(0);

  const handleGetGames = () => {
    const getGames = async () => {
      setGames(await getProductsMainSection());
    };
    getGames();
  };

  useEffect(() => {
    handleGetGames();
  }, [doRender]);

  // loading
  useEffect(() => {
    if (!games.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  const pcRegex = /pc/i;
  const playstationRegex = /android/i;

  const androidRegex = /playstation 4/i;
  const iosRegex = /ios/i;

  const toPlaystationGames = filterPlatforms(games, playstationRegex);

  const toPcGames = filterPlatforms(games, pcRegex);
  const toAndroidGames = filterPlatforms(games, androidRegex);
  const toIosGames = filterPlatforms(games, iosRegex);

  const useAllPlatforms = () => {
    const [playstationGames, setPlaystationGames] = useState([]);

    const [pcGames, setPcGames] = useState([]);
    const [androidGames, setAndroidGames] = useState([]);
    const [iosGames, setIosGames] = useState([]);

    useEffect(() => {
      setPlaystationGames(toPlaystationGames);
      setPcGames(toPcGames);
      setAndroidGames(toAndroidGames);
      setIosGames(toIosGames);
    }, [games]);

    return {
      playstationGames,
      pcGames,
      androidGames,
      iosGames,
      setPlaystationGames,
      setPcGames,
      setAndroidGames,
      setIosGames,
      loading,
    };
  };

  return {
    useAllPlatforms,
    games,
    handleGetGames,
    setDoRender,
    doRender,
  };
};

export default useBodyGames;
