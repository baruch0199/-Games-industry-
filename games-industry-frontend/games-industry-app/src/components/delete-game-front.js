const deleteGameFront = (id, gamesPlatform, setGamesPlatform) => {
  const fillterd = gamesPlatform.filter((games) => {
    return games._id != id;
  });
  setGamesPlatform(fillterd);
};

export default deleteGameFront;
