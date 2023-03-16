import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import headerGames from "../games-the-source/array-of-games-for-header-games";
import HeroGames from "../hero-games/hero-games";

const Hero = () => {
  const games = headerGames();

  return (
    <>
      <div className="hero-section">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          slidesPerGroup={1}
          loopFillGroupWithBlank={true}
          navigation={{
            hideOnClick: true,
          }}
          modules={[Navigation]}
          className="mySwiper">
          {games.map((game) => {
            const { _id } = game;
            return (
              <SwiperSlide key={_id}>
                <HeroGames game={game} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
