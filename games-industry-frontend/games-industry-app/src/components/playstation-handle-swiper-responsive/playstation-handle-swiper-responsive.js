export const playstationSwiperResponsiveHandler = (
  setslidesPre,
  setSlidesPerGroup
) => {
  const changeStates = () => {
    ////less then 1000
    const lessThen1000 = () => {
      if (window.innerWidth < 1000) {
        setslidesPre(2);
        setSlidesPerGroup(2);
      } else if (window.innerWidth > 1000) {
        setslidesPre(3);
        setSlidesPerGroup(3);
      }
    };
    lessThen1000();

    window.addEventListener("resize", () => {
      lessThen1000();
    });

    ////less then 500
    const lessThen650 = () => {
      if (window.innerWidth < 650) {
        setslidesPre(1);
        setSlidesPerGroup(1);
      } else if (window.innerWidth > 650 && window.innerWidth < 1000) {
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
