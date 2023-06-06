import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePlay,
  handlePause,
}) => {
  return isPlaying && activeSong?.title === song?.title ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 transition-all duration-300 hover:text-cyan-400"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300 transition-all duration-300 hover:text-cyan-400"
      onClick={handlePlay}
    />
  );
};

export default PlayPause;
