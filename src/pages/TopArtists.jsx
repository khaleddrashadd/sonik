import { useGetTopSongQuery } from '../redux/services/shazam';
import { ArtistCard, Error, Loader } from '../components';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopSongQuery();

  if (error) return <Error />;
  if (isFetching) <Loader title="Loading Top Artists" />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl mt-4 mb-10 text-white">
        Discover Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map(track => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
