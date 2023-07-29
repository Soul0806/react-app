import React, { useState, useEffect } from 'react'
import { dt, ajax_get } from '../../lib/helper';
import { axi } from '../../lib/axios';

const d = dt.getTodayDate();

export async function getDbSale(date = d) {
  const url = 'http://localhost:9000/io/readFile';
  const fileName = 'static/sale.json';
  const data = { fileName };
  const res = await axi.post(url, data);
  const result = await res.data;

  const sale = result.map(item => {
    if (item.date == date) {
      return item;
    }
  })

  return sale
}

function useSale() {
  const [dbSale, setDbSale] = useState([]);

  useEffect(() => {
    getDbSale().then(res => setDbSale(res))
  }, [])

  return [dbSale, setDbSale]
}

export { useSale }