import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [serachTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (serachTerm) {
      navigate(`/search/${serachTerm}`);
    }
    setSearchTerm('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search All Songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch
          className="w-5 h-5 ml-4 cursor-pointer hover:text-cyan-400"
          onClick={handleSubmit}
        />
        <input
          type="search"
          name="search-field"
          id="search-field"
          placeholder="Search for a song"
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
          value={serachTerm}
          className="flex-1 bg-transparent boreder-none outline-none placeholder-gray-500 text-base text-white py-4 pl-6 pr-12 focus:placeholder:text-sm"
        />
      </div>
    </form>
  );
};

export default Searchbar;
