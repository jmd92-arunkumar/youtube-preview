import React from 'react';

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};


const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="flex items-center w-full mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="p-2 w-full border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBar;
