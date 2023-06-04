import { useDispatch, useSelector } from 'react-redux';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetTopSongQuery } from '../redux/services/shazam';
import { playPause } from '../redux/features/playerSlice';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { backupImg } from '../assets';

const TopChartCard = ({ song, i }) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {song.title}
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { setActiveSong, isPlaying } = useSelector(state => state.player);
  const { data } = useGetTopSongQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard key={song.key} i={i} song={song} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              className="shadow-lg rounded-full animate-slideright"
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  className="rounded-full w-full object-cover"
                  src={song?.images.background || backupImg}
                  alt="artist-image"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default TopPlay;
