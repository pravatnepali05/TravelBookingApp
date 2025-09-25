import React, { useState } from 'react';
import Banner from '../components/Banner';
import DreamVacation from '../components/DreamVacation';
import NextTrip from '../components/NextTrip';

const HomePage = () => {
  const [query, setQuery] = useState("");

  // Banner will call this when the user submits the search
  const handleSearch = (text) => setQuery(text);

  return (
    <div>
      <Banner onSearch={handleSearch} />
      <DreamVacation searchQuery={query} />
      <NextTrip />
    </div>
  );
};

export default HomePage;
