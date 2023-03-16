import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useState } from "react";
import { useEffect } from "react";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";

import { pcSwiperResponsiveHandler } from "../pc-handle-swiper-responsive/pc-handle-swiper-responsive";

import PcGameCards from "../pc-game-cards/pc-game-cards";

const Pc = ({ setGameMoreInfo, setIsVIsable, setGameInfo }) => {
  const { useAllPlatforms } = useBodyGames();
  const { pcGames, setPcGames } = useAllPlatforms();

  const [slidesPre, setslidesPre] = useState(4);
  const [slidesPerGroup, setSlidesPerGroup] = useState(4);
  const [paragraphIndex, setParagraphIndex] = useState(null);

  useEffect(() => {
    pcSwiperResponsiveHandler(
      setslidesPre,
      setSlidesPerGroup,
      setParagraphIndex
    );
  }, []);

  return (
    <>
      <div className="pc-section mx-5 ">
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
          {pcGames.map((game) => {
            const { title, description, _id } = game;

            const shortTitle = title.slice(0, 30).replace(/$/, " ...");
            const shortDescription = description
              .trim()
              .slice(0, paragraphIndex)
              .replace(/$/, " ...");

            return (
              <SwiperSlide key={_id}>
                <PcGameCards
                  game={game}
                  paragraphIndex={paragraphIndex}
                  setGameInfo={setGameInfo}
                  setIsVIsable={setIsVIsable}
                  setGameMoreInfo={setGameMoreInfo}
                  shortTitle={shortTitle}
                  shortDescription={shortDescription}
                  pcGames={pcGames}
                  setPcGames={setPcGames}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export { Pc };
