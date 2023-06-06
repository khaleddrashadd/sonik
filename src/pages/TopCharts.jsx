import { useSelector } from 'react-redux';
import { useGetTopSongQuery } from '../redux/services/shazam';
import { Error, Loader, SongCard } from '../components';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopSongQuery();

  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (error) return <Error />;
  if (isFetching) <Loader title="Loading Top Charts" />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl mt-4 mb-10 text-white">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            song={song}
            i={i}
            key={song.key}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
