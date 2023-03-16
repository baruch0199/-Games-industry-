import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useState } from "react";
import { useEffect } from "react";

import { playstationSwiperResponsiveHandler } from "../playstation-handle-swiper-responsive/playstation-handle-swiper-responsive";

import PlaystationGameCards from "../playstation-game-cards/playstation-game-cards";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";

const Playstation = ({ setGameMoreInfo, setIsVIsable, setGameInfo }) => {
  const [slidesPre, setslidesPre] = useState(3);
  const [slidesPerGroup, setSlidesPerGroup] = useState(3);

  const { useAllPlatforms } = useBodyGames();
  const { playstationGames, setPlaystationGames } = useAllPlatforms();

  useEffect(() => {
    playstationSwiperResponsiveHandler(setslidesPre, setSlidesPerGroup);
  }, []);

  return (
    <>
      <div className="playstation-section mx-5 ">
        <Swiper
          slidesPerView={slidesPre}
          spaceBetween={30}
          slidesPerGroup={slidesPerGroup}
          loopFillGroupWithBlank={true}
          navigation={{
            hideOnClick: true,
          }}
          modules={[Navigation]}
          className="mySwiper">
          {playstationGames.map((game) => {
            const { title, _id, description } = game;

            const shortTitle = title.slice(0, 30).replace(/$/, " ...");
            const shortDescription = description
              .trim()
              .slice(0, 260)
              .replace(/$/, " ...");

            return (
              <SwiperSlide key={_id}>
                <PlaystationGameCards
                  game={game}
                  setGameInfo={setGameInfo}
                  setIsVIsable={setIsVIsable}
                  shortTitle={shortTitle}
                  shortDescription={shortDescription}
                  setGameMoreInfo={setGameMoreInfo}
                  playstationGames={playstationGames}
                  setPlaystationGames={setPlaystationGames}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Playstation;
