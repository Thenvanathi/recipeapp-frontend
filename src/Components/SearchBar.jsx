import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
    >
      <input
        type="text"
        placeholder="🔍 Search for recipes..."
        value={searchTerm}
        onChange={handleChange}
        className="flex-1 w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
