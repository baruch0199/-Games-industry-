import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useState } from "react";
import { useEffect } from "react";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";

import { iosSwiperResponsiveHandler } from "../ios-handle-swiper-responsive/ios-handle-swiper-responsive";

import IosGameCards from "../ios-game-cards/ios-game-cards";

const Ios = ({ setGameMoreInfo, setGameInfo, setIsVIsable }) => {
  const { useAllPlatforms } = useBodyGames();
  const { iosGames, setIosGames } = useAllPlatforms();

  const [slidesPre, setslidesPre] = useState(2);
  const [slidesPerGroup, setSlidesPerGroup] = useState(2);
  const [paragraphIndex, setParagraphIndex] = useState(null);

  useEffect(() => {
    iosSwiperResponsiveHandler(
      setslidesPre,
      setSlidesPerGroup,
      setParagraphIndex
    );
  }, []);

  return (
    <>
      <div className="ios-section mx-5 text-white">
        <Swiper
          slidesPerView={slidesPre}
          spaceBetween={40}
          slidesPerGroup={slidesPerGroup}
          loopFillGroupWithBlank={true}
          navigation={{
            hideOnClick: true,
          }}
          modules={[Navigation]}
          className="mySwiper">
          {iosGames.map((game) => {
            const { title, _id, description } = game;
            const shortTitle = title.slice(0, 30).replace(/$/, " ...");
            const shortDescription = description
              .trim()
              .slice(0, paragraphIndex)
              .replace(/$/, " ...");
            return (
              <SwiperSlide key={_id}>
                <IosGameCards
                  game={game}
                  setGameMoreInfo={setGameMoreInfo}
                  setGameInfo={setGameInfo}
                  setIsVIsable={setIsVIsable}
                  shortTitle={shortTitle}
                  shortDescription={shortDescription}
                  iosGames={iosGames}
                  setIosGames={setIosGames}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Ios;
