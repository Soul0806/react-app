import React, { useEffect, useState } from 'react'
import { dt } from '../../lib/helper';
import { getDbSale } from './useSale';
import { isEmpty } from 'lodash';
import { axi } from '../../lib/axios';

// console.log(getDbSale());

const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}
function Sale({ salesState }) {
    const [today, setToday] = useState(new Date());
    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }, [])

    function toLast() {
        console.log(dt.getLastday(today).toDate());
        const lastDate = dt.getLastday(today).toDate();
        salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[lastDate] || []);
        getDbSale(lastDate).then(res => salesState.setDbSale(res))
        setToday(prev => dt.getLastday(today))
    }

    function toNext() {
        const nextDate = dt.getNextday(today).toDate();
        salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[nextDate] || []);
        getDbSale(nextDate).then(res => salesState.setDbSale(res))
        setToday(prev => dt.getNextday(today))
    }

    function onclick(to) {
        if (to == 'last') {
            toLast();
        } else {
            toNext();
        }
    }

    return (
        <div className="sale-wrapper">
            <div className="date flex g-1">
                <div className="material-symbols-outlined arrow-back" onClick={() => onclick('last')}>
                    arrow_back
                </div>
                {today.toDate()}
                <div className="material-symbols-outlined arrow-forward" onClick={() => onclick('next')}>
                    arrow_forward
                </div>
            </div>
            <h2>Local</h2>
            {!salesState.sales ? <div>查無資料</div>
                :
                <div>
                    {salesState.sales.map(sale => {
                        return (
                            <div key={sale.id} className="flex g-1">{sale?.id}{sale.service == 'fix' ?
                                <>
                                    <div>補</div>
                                </>
                                :
                                <>
                                    <div>售</div>
                                    <div className="f-g-1">{sale.spec}</div>
                                    <div>{sale.quantity}</div>
                                </>
                            }
                                <div className='d-sign'>{sale.price}</div>
                                <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                                    {sale.pay == 'cash' && 'monetization_on'}
                                    {sale.pay == 'credit' && 'credit_card'}
                                    {sale.pay == 'transfer' && 'phone_iphone'}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            }
            <h2>Database</h2>
            {salesState.dbSale.map(sale => {
                if (!isEmpty(sale))
                    return <SaleTmp sale={sale} salesState={salesState} />
            })
            }
        </div>
    )
}


async function handleDel(id, salesState) {
    let del = confirm('Delete');
    if (del) {
        salesState.setDbSale(sale => {
            return sale.filter(s => {
                if (s.id != id)
                    return s;
            })
        });
    }
    const res = await axi.delete(`http://localhost:9000/sale/${id}`);
}


function SaleTmp({ sale, salesState }) {
    return (
        <div key={sale.id} className="flex g-1">{sale?.id}{sale.service == 'fix' ?
            <>
                <div>補</div>
            </>
            :
            <>
                <div>售</div>
                <div className="f-g-1">{sale.spec}</div>
                <div>{sale.quantity}</div>
            </>
        }
            <div className='d-sign'>{sale.price}</div>
            {sale.pay &&
                <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                    {sale.pay == 'cash' && 'monetization_on'}
                    {sale.pay == 'credit' && 'credit_card'}
                    {sale.pay == 'transfer' && 'phone_iphone'}
                </div>
            }
            <div className="del"><span class="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                delete
            </span></div>
        </div>
    )
}

export default Sale