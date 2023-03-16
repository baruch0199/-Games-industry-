const showGameInfo = (title, description, published_date, _id, setStates) => {
  const { setGameMoreInfo, setIsMoreInfoVisible } = setStates;

  setGameMoreInfo({
    title: title,
    description: description,
    published_date: published_date,
    _id: _id,
  });
  setIsMoreInfoVisible(true);
};

export default showGameInfo;
