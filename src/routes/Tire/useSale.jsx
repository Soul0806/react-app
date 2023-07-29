import React, { useState, useEffect } from 'react'
import { dt, ajax_get } from '../../lib/helper';
import { axi } from '../../lib/axios';

const d = dt.getTodayDate();

export async function getDbSale(date, init) {
  const url = 'http://localhost:9000/io/readFile';
  const fileName = 'static/sale.json';
  const data = { fileName };
  const res = await axi.post(url, data);
  const result = await res.data;
  
  if(!result) {
    return init;
  }

  const sale = result.map(item => {
    if (item.date == date) {
      return item;
    }
  })

  return sale
}

function useSale(init = []) {
  const [dbSale, setDbSale] = useState([]);
  const [ id , setId] = useState(0);

  useEffect(() => {
    getDbSale(d, init).then(res => {
      if(res.length > 0) {
        setId(res.length);
      }
      setDbSale(res)
    })
  }, [])

  return [ dbSale, setDbSale, id ]
}

export { useSale }