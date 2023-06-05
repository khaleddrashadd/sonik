import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongBar, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopSongQuery } from '../redux/services/shazam';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data, isFetching, error } = useGetTopSongQuery();

  const genreTitle = 'Pop';
  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;
  console.log(activeSong, 'aaaaaaaaaaaaaaaaaaaaaaa');
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          name=""
          id=""
          className="bg-black text-gray-500 text-sm p-3 focus:outline-none rounded-lg sm:mt-0 mt-5"
          onChange={e => {}}
        >
          {genres.map(genre => (
            <option value={genres.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            data={data}
            activeSong={activeSong}
            isPlaying={isPlaying}
            key={song.key}
            song={song}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default Discover;
