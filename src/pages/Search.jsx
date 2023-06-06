import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSongsBySearchQuery } from '../redux/services/shazam';
import { Error, Loader, SongCard } from '../components';

const Search = () => {
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const songs = data?.tracks?.hits?.map(song => song.track);

  if (error) return <Error />;
  if (isFetching) <Loader title="Loading Search Results." />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl mt-4 mb-10 text-white">
        Show Results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
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

export default Search;
