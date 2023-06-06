import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazam';
import { Error, Loader, SongCard } from '../components';

const key = import.meta.env.VITE_LOCATION_API_KEY;

const AroundYou = () => {
  const [country, setCountry] = useState(null);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  const { activeSong, isPlaying } = useSelector(state => state.player);

  useEffect(() => {
    const controller = new AbortController();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        axios
          .get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&apiKey=${key}`,
            { signal: controller.signal }
          )
          .then(res =>
            setCountry(res.data.results[0].country_code.toUpperCase())
          );
      });
    }
    return () => {
      controller.abort();
    };
  }, []);

  if (error && country) return <Error />;
  if (isFetching) <Loader title="Loading Songs around you" />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl mt-4 mb-10 text-white">
        Around You <span className="font-semibold text-base">({country})</span>
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

export default AroundYou;
