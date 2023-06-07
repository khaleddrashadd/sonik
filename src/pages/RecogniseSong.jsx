import axios from 'axios';
import { useRef, useState } from 'react';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { SongCard } from '../components';

const RecogniseSong = () => {
  const [ispressed, setIsPressed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorder = useRef(null);
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const file = new FormData();

  const handleMouseDown = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(stream => {
          if (!ispressed) {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.start();
            mediaRecorder.current.ondataavailable = e => {
              const audioBlob = new Blob([e.data], { type: 'audio/wav' });
              file.append('file', audioBlob);
              const option = {
                method: 'POST',
                url: 'https://shazam-core.p.rapidapi.com/v1/tracks/recognize',
                headers: {
                  'X-RapidAPI-Key':
                    '40d9d5e79dmshb9c1ee1da2e70dap1cd380jsn08dff1d3e248',
                },
                data: file,
              };

              axios.request(option).then(res => {
                setData(res?.data);
              });
            };
            setIsPressed(true);
          } else {
            mediaRecorder.current.stop();
            setIsPressed(false);
          }
        })
        .catch(err => {
          setError(err.message);
        });
    }
  };
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return (
      <h2 className="text-white">
        getUserMedia not supported on your browser!
      </h2>
    );
  }

  return (
    <div
      className="flex flex-col gap-y-8 justify-center items-center mt-48"
      onClick={handleMouseDown}
    >
      <div>
        <h2 className="text-white font-bold text-3xl">
          {ispressed ? 'Press again to Search' : 'Press To Listen'}
        </h2>
      </div>
      <div
        className={`select-none flex justify-center items-center w-36 h-36 bg-black/70 ${
          ispressed ? 'animate-pulseheavy' : 'animate-pulselight transition-all'
        } rounded-full`}
      >
        <HiOutlineMusicNote className="text-white w-28 h-28" />
      </div>
      <div>
        {data && data?.track && (
          <SongCard
            data={[data?.track]}
            song={data?.track}
            activeSong={activeSong}
            isPlaying={isPlaying}
            i={0}
          />
        )}
      </div>
      <div>
        {data && !data?.track && (
          <h2 className="text-white font-bold text-3xl">Sorry No Result</h2>
        )}
      </div>
      <div>
        {error && <h2 className="text-white font-bold text-3xl">{error}</h2>}
      </div>
    </div>
  );
};

export default RecogniseSong;
