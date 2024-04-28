import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Item {
  title: string;
  // other properties if applicable
}

function AxiosApi() {
  const [newApi, setNewApi ]=useState([])

  useEffect(()=>{
    const getApi = async()=>{
      let fetchData:any = await axios.get('https://fakestoreapi.com/products')

      fetchData = fetchData.data

      setNewApi(fetchData)
    }
    getApi()
  },[])

  return (
    <div>
      
      <h3>  Fake Store Data by Axios </h3>
      {
        newApi.map((item:Item, index:number)=>{
          return <li key={index}> {item.title}</li>
        }
        )
      }
    </div>
  )
}

export default AxiosApi