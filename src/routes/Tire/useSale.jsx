import React, { useState, useEffect } from 'react'
import { getTodayDate, ajax_get } from '../../lib/helper';

const date = getTodayDate();
const SALE_D_API_URL = `https://localhost:7123/api/Sale/?d=${date}`;

async function getSaleRecord() {
    const data = await ajax_get(SALE_D_API_URL);
    const sales = await data.json();
    return sales
}

function useSale() {
  const [ saleRecord, setSaleRecord ]  = useState([]);

  useEffect(() => {
    getSaleRecord().then(res => setSaleRecord(res))
  }, [])
  
  return [ saleRecord, setSaleRecord ]
}

export { useSale }