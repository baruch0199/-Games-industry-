export const iosSwiperResponsiveHandler = (
  setslidesPre,
  setSlidesPerGroup,
  setParagraphIndex
) => {
  const changeStates = () => {
    ////less then 650
    const lessThen650 = () => {
      if (window.innerWidth < 650) {
        setslidesPre(1);
        setSlidesPerGroup(1);
      } else if (window.innerWidth) {
        setslidesPre(2);
        setSlidesPerGroup(2);
      }
    };
    lessThen650();

    window.addEventListener("resize", () => {
      lessThen650();
    });
  };
  changeStates();
};
