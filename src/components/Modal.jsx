import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Modal({cryptoId}) {
    const [cryptoData,setCryptoData] = useState(null)
// fetching the details of the coin whenever the selected crypto id changes
    useEffect(()=>{
        axios.get(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`)
        .then((res)=>setCryptoData(res.data[0]))
        .catch(err=>close.console.warn(err))
    },[cryptoId])
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-theme="dark" aria-hidden="true">
    <div className="modal-dialog modal-dialog modal-dialog-centered">
        {cryptoData ? 
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{`${cryptoData.name} (${cryptoData.symbol})`}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row py-0">
                <table className='w-100 modal-table m-0'>
                    <thead>
                    <tr>
                    <th>Parameters</th>
                    <th>Values</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rank</td>
                            <td>{cryptoData.rank}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>$ {cryptoData.price_usd}</td>
                        </tr>
                        <tr>
                            <td>% change in 24 hour</td>
                            <td className={`${parseFloat(cryptoData.percent_change_24h) < 0?"text-danger":"text-success"}`}>{cryptoData.percent_change_24h}</td>
                        </tr>
                        <tr>
                            <td>% change in 7 days</td>
                            <td className={`${parseFloat(cryptoData.percent_change_24h) < 0?"text-danger":"text-success"}`}>{cryptoData.percent_change_7d}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal-footer p-1">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            :
            <div className="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        }
    </div>
    </div>
  )
}
