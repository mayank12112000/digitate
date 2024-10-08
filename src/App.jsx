import React, { lazy, useEffect, useState } from 'react';
import axios from 'axios';
import CryptoTable from './components/CryptoTable';
import './App.css';
import Pagination from './components/Pagination';
const Modal = lazy(()=> import('./components/Modal'))

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [cryptoId,setCryptoId] = useState(null)
  const [searchForm,setSearchForm] = useState({
    searchTerm:"",sortBy:"",sortDirection:"ascending",filterRank:"",filterPrice:""
  })
  // retrieving data in first render
  useEffect(() => {
    axios.get('https://api.coinlore.net/api/tickers/')
      .then(response => setCryptoData(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

// filtering the data
  let filteredData = cryptoData.filter((item) =>
    item.name.toLowerCase().includes(searchForm.searchTerm.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchForm.searchTerm.toLowerCase())
  );
// sorting the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (searchForm.sortBy !== "") {
      const sortOrder = searchForm.sortDirection === "ascending" ? 1 : -1
      return (sortOrder * parseFloat(a[searchForm.sortBy]) ) -(sortOrder * parseFloat(b[searchForm.sortBy]))
    }
    return 0;
  });

  // filtering again by terms of price and rank
  filteredData = searchForm.filterRank
    ? sortedData.filter((item) => item.rank <= searchForm.filterRank)
    : sortedData;
  const dataToDisplay = searchForm.filterPrice ? filteredData.filter(item => parseFloat(item.price_usd) <= parseFloat(searchForm.filterPrice)) : filteredData
  
  // for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // for changing form related to filtering and sorting 
  const handleSearchFormChnage=(e)=>{
    let {name,value} = e.target
    setSearchForm((preData)=>{
      return {...preData,[name]:value}
    })
  }
  // clearing all search and sort
  const clearSort=()=>{
    setSearchForm(()=>{return {searchTerm:"",sortBy:"",sortDirection:"ascending",filterRank:"",filterPrice:""}})
  }
    return (
    <div className="App my-3">
      <h1> <img className='logo' src="https://cdn3.iconfinder.com/data/icons/cryptocurrency-35/100/cryptocurrency_bitcoin_blockchain_crypto-08-1024.png" alt="" /> Cryptocurrency Grid</h1>
      <div className="row mt-3">
        <input name='searchTerm' className='form-control mx-2 mb-3  col-sm' data-bs-theme="dark" type="text" placeholder="Search by name or symbol" value={searchForm.searchTerm} onChange={handleSearchFormChnage} /> 
        <input value={searchForm.filterRank} name='filterRank' className='form-control mx-2 mb-3 col-sm' data-bs-theme="dark" type="number" placeholder="Filter by rank" onChange={handleSearchFormChnage} />
      </div>
      <div className="row">
        <input value={searchForm.filterPrice} name='filterPrice' className='form-control mx-2 mb-3 col-sm' data-bs-theme="dark" type="number" placeholder="Filter by price" onChange={handleSearchFormChnage} />
        <select name="sortBy" value={searchForm.sortBy} onChange={handleSearchFormChnage}  className='col-sm  mx-2 mb-3 form-select' data-bs-theme="dark" id="sortBy">
          <option value={""}>Sort by: none</option>
          <option value="price_usd">Price</option>
          <option value="rank">Rank</option>
          <option value="percent_change_24h">Percent Change(24hr)</option>
        </select>
        <select name="sortDirection" onChange={handleSearchFormChnage} value={searchForm.sortDirection} className='col-sm  mx-2 mb-3 form-select' data-bs-theme="dark" id="sortBy">
          <option  value="ascending">Ascending</option>
          <option  value="descending">Descending</option>
        </select>

        <button onClick={clearSort} className='btn btn-secondary mb-3 mx-2 col-sm'>Clear all filters & sorting</button>
      </div>

      <CryptoTable
        cryptoData={dataToDisplay}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCryptoId={setCryptoId}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataToDisplay.length}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <Modal cryptoId={cryptoId}/>
    </div>
  );
}

export default App;
