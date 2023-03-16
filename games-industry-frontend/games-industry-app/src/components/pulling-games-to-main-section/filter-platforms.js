const filterPlatforms = (allPlatformsGames, platform) => {
  const regex = platform;

  if (allPlatformsGames.length) {
    const gamesPlatform = [];
    for (let game of allPlatformsGames) {
      const isExist = regex.test(game["platforms"]);

      if (isExist) {
        gamesPlatform.push(game);
      }
    }

    return gamesPlatform;
  }

  if (!allPlatformsGames.length) {
    return allPlatformsGames;
  }
};

export default filterPlatforms;
