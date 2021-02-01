import React from 'react'
import { Doughnut } from '@reactchartjs/react-chart.js'
import { Pie } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'
import { Radar } from '@reactchartjs/react-chart.js'
import axios from 'axios'

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100,
      },
      mutations: {
        // mutation options
      },
    },
})


function Doug() {
  
const   queryDataBourse = ()=>{
    let url  = "https://api.blockchain.com/v3/exchange/tickers"
    const res = axios.get(url)
    .then(resp => resp.data)
    return  res
}
const { isLoading, error, data, isFetching } = useQuery("bourseData",  queryDataBourse,  {
    refetchAllOnWindowFocus: false,
})

if (isFetching) return "";
if (isLoading) return "...Loading";
if (error) return  "An error has occurred: " + error.message;

const color = data.map((k, i)=>{
                let rand = () => Math.floor(Math.random() * 255)
                return( 'rgba('+[rand(),rand(),rand(), 0.9]+')' )
            })
const borderColor= data.map((k, i)=>{
                let rand = () => Math.floor(Math.random() * 255)
                return( 'rgba('+[100,0,rand(), 0.5]+')' )
            })
const labels =  data.map (k=>( k.symbol ))
const num =  data.map (k=>( k.price_24h))
const volume =  data.map (k=>( k.volume_24h))
const trade =  data.map (k=>( k.last_trade_price))


const  datasetPrice =    [{label: '#cours', data:  num,  backgroundColor: color, borderColor:borderColor}]
const dataFinalPrice =    {labels: labels, datasets: datasetPrice}

const  datasetVolume =    [{label: '#volume', data:  volume,  backgroundColor: color, borderColor:borderColor}]
const dataFinalVolume =    {labels: labels, datasets: datasetVolume}

const  datasetTrade =    [{label: '#trade', data:  trade,  backgroundColor: color, borderColor:borderColor}]
const dataFinalTrade =    {labels: labels, datasets: datasetTrade}

return(
  <>
   <Doughnut data={dataFinalPrice} />
   <Pie data={dataFinalVolume} />
   <Line data={dataFinalPrice}/>
   <Radar data={dataFinalTrade}/>
  </>
)
}

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Doug/>
      </QueryClientProvider>
    );
  }