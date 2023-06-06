import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazam';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const { activeSong, isPlaying } = useSelector(state => state.player);
  if (isFetching) {
    return <Loader title="Laoding Artist Details..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <RelatedSongs
        data={artistData?.data[0].views['top-songs'].data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
