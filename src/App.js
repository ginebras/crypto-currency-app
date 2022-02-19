import React, { useState, useEffect } from 'react';
import './style.css';
import './App.css';

import axios from 'axios';
import Coin from './Coin';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(async () => {
    const response = await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .catch((error) => console.log(error));

    setCoins(response.data);
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {filteredCoins.map((coin, index) => {
        return <Coin coin={coin} key={index} />;
      })}
    </div>
  );
}
