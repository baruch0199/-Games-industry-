import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useState } from "react";
import { useEffect } from "react";

import { androidSwiperResponsiveHandler } from "../android-handle-swiper-responsive/android-handle-swiper-responsive";
import useBodyGames from "../pulling-games-to-main-section/get-games-to-main-section";
import AndroidGameCards from "../android-game-cards/android-game-cards";

const Android = ({ setGameMoreInfo, setGameInfo, setIsVIsable }) => {
  useEffect(() => {
    androidSwiperResponsiveHandler(
      setslidesPre,
      setSlidesPerGroup,
      setParagraphIndex
    );
  }, []);

  const { useAllPlatforms } = useBodyGames();
  const { androidGames, setAndroidGames } = useAllPlatforms();

  const [slidesPre, setslidesPre] = useState(4);
  const [slidesPerGroup, setSlidesPerGroup] = useState(4);
  const [paragraphIndex, setParagraphIndex] = useState(null);

  return (
    <>
      <div className="android-section mx-5 ">
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
          {androidGames.map((game) => {
            const { title, _id, description } = game;
            const shortTitle = title.slice(0, 30).replace(/$/, " ...");
            const shortDescription = description
              .trim()
              .slice(0, paragraphIndex)
              .replace(/$/, " ...");

            return (
              <SwiperSlide key={_id}>
                <AndroidGameCards
                  game={game}
                  setGameMoreInfo={setGameMoreInfo}
                  setGameInfo={setGameInfo}
                  setIsVIsable={setIsVIsable}
                  shortTitle={shortTitle}
                  shortDescription={shortDescription}
                  androidGames={androidGames}
                  setAndroidGames={setAndroidGames}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export { Android };
