import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  Searchbar,
  Sidebar,
  MusicPlayer,
  TopPlay,
  ScrollToTop,
} from './components';
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  RecogniseSong,
} from './pages';

const App = () => {
  const { activeSong } = useSelector(state => state.player);

  return (
    <>
      <ScrollToTop />
      <div className="relative flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#520c0c]">
          <Searchbar />

          <div className="px-6 h-screen  overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/discover" element={<Discover />} />
                <Route
                  path="/"
                  element={<Navigate replace="true" path="/" to="/discover" />}
                />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/recognise-song" element={<RecogniseSong />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          </div>
        </div>

        {activeSong?.title && (
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
