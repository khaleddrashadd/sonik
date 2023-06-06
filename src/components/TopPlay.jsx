import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGetTopSongQuery } from '../redux/services/shazam';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { backupImg } from '../assets';
import PlayPause from './PlayPause';
import 'swiper/css';
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row items-center justify-between">
      <img
        className="w-14 h-14 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 mx-4 flex-col justify-center">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-white text-base mb-2 font-bold hover:text-cyan-400 transition-all duration-300">
            {song.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="mt-1 text-gray-300 text-sm font-bold hover:text-cyan-400 transition-all duration-300">
            {song.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data } = useGetTopSongQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-0 flex-1 xl:max-w-[300px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center mt-12">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts" aria-label="see more charts">
            <p className="text-gray-300 text-base cursor-pointer hover:text-cyan-400 transition-all duration-300">
              More Charts
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              i={i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => {
                handlePlayClick(song, i);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer hover:text-cyan-400 transition-all duration-300">
              More Artists
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
          freeMode="true"
        >
          {topPlays?.map(song => (
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
