const showEditGameInfo = (
  title,
  description,
  published_date,
  _id,
  setStates
) => {
  const { setGameInfo, setIsVIsable } = setStates;
  setGameInfo({
    title: title,
    description: description,
    published_date: published_date,
    _id: _id,
  });
  setIsVIsable(true);
};

export default showEditGameInfo;
