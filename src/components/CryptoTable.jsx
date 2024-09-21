import React from 'react';

const CryptoTable = ({ cryptoData, itemsPerPage, currentPage }) => {
  
  const dataToDisplay = [...cryptoData].splice((currentPage-1)*10,itemsPerPage)
  return (
    <div className='row'>

    <table className="crypto-table container">
      <thead className='w-100'>
        <tr>
          <th className='col-2'>Name</th>
          <th className='col-2'>Symbol</th>
          <th className='col-2'>Price (USD)</th>
          <th className='col-2'>Rank</th>
          <th className='col-2'>% Change (24h)</th>
        </tr>
      </thead>
      <tbody >
        {dataToDisplay.map((crypto) => (
          <tr key={crypto.id} className='w-100'>
            <td className='col-2'>{crypto.name}</td>
            <td className='col-2'>{crypto.symbol}</td>
            <td className='col-2'>{crypto.price_usd}</td>
            <td className='col-2'>{crypto.rank}</td>
            <td className={`col-2 ${parseFloat(crypto.percent_change_24h) <0? "text-danger":"text-success"}`}>{crypto.percent_change_24h}</td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
  );
};

export default CryptoTable;
