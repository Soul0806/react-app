import React, { useState, useEffect } from 'react'
import { getTodayDate, ajax_get } from '../../lib/helper';

const d = getTodayDate();

export async function getDbSale(date = d) {
    const SALE_D_API_URL = `https://localhost:7123/api/Sale/?d=${date}`;
    const data = await ajax_get(SALE_D_API_URL);
    const sales = await data.json();
    return sales
}

function useSale() {
  const [ dbSale, setDbSale ]  = useState([]);

  useEffect(() => {
    getDbSale().then(res => setDbSale(res))
  }, [])
  
  return [ dbSale, setDbSale ]
}

export { useSale }