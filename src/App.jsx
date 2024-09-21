import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoTable from './components/CryptoTable';
import './App.css';
import Pagination from './components/Pagination';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchForm,setSearchForm] = useState({
    searchTerm:"",sortBy:"",sortDirection:"ascending",filterRank:null,filterPrice:null
  })
  const {searchTerm,sortBy,sortDirection,filterRank, filterPrice} = searchForm
  useEffect(() => {
    axios.get('https://api.coinlore.net/api/tickers/')
      .then(response => setCryptoData(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  let filteredData = cryptoData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy !== "") {
      const sortOrder = sortDirection === "ascending" ? 1 : -1
      return (sortOrder * parseFloat(a[sortBy]) ) -(sortOrder * parseFloat(b[sortBy]))
    }
    return 0;
  });


  filteredData = filterRank
    ? sortedData.filter((item) => item.rank <= filterRank)
    : sortedData;
  const dataToDisplay = filterPrice ? filteredData.filter(item => parseFloat(item.price_usd) <= parseFloat(filterPrice)) : filteredData
  const clearSort=()=>{
    setSearchForm({searchTerm:"",sortBy:"",sortDirection:"ascending",filterRank:null})
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchFormChnage=(e)=>{
    let {name,value} = e.target
    setSearchForm((preData)=>{
      return {...preData,[name]:value}
    })
  }
  console.log(searchForm)
    return (
    <div className="App">
      <h1>Cryptocurrency Grid</h1>
      <div className="row">
        <input name='searchTerm' className='form-control mx-2 mb-3  col-sm' data-bs-theme="dark" type="text" placeholder="Search by name or symbol" value={searchTerm} onChange={handleSearchFormChnage} /> 
        <input name='filterRank' className='form-control mx-2 mb-3 col-sm' data-bs-theme="dark" type="number" placeholder="Filter by rank" onChange={handleSearchFormChnage} />
      </div>
      <div className="row">
        <input name='filterPrice' className='form-control mx-2 mb-3 col-sm' data-bs-theme="dark" type="number" placeholder="Filter by price" onChange={handleSearchFormChnage} />
        <select name="sortBy" value={sortBy} onChange={handleSearchFormChnage}  className='col-sm  mx-2 mb-3 form-select' data-bs-theme="dark" id="sortBy">
          <option value={""}>Sort by: none</option>
          <option value="price_usd">Price</option>
          <option value="rank">Rank</option>
          <option value="percent_change_24h">Percent Change(24hr)</option>
        </select>
        <select name="sortDirection" onChange={handleSearchFormChnage} value={sortDirection} className='col-sm  mx-2 mb-3 form-select' data-bs-theme="dark" id="sortBy">
          <option  value="ascending">Ascending</option>
          <option  value="descending">Descending</option>
        </select>

        <button onClick={clearSort} className='btn btn-secondary mb-3 mx-2 col-sm'>Clear all filters & sorting</button>
      </div>

      <CryptoTable
        cryptoData={dataToDisplay}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataToDisplay.length}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
