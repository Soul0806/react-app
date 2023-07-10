import React, { useEffect, useState } from 'react'
import { getToday, getLastday, getNextday } from '../../lib/helper';

const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}

function Sale({ salesState }) {
    const [ day, setDay ] = useState(getToday());
    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }, [])

    function onclick(to) {
        const lastday = getLastday(day).toLocaleString().split(' ')[0]
        const nextday = getNextday(day).toLocaleString().split(' ')[0]
        if(to == 'last') {
            salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[lastday] || []);
            setDay(prev => getLastday(day))
        } else {
            salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[nextday] || []);
            setDay(prev => getNextday(day))
        }
    }
    
    return (
        <div className="sale">
            <div className="date flex g-1">
                <div class="material-symbols-outlined arrow-back" onClick={() => onclick('last')}>
                    arrow_back
                </div>
                {day.toLocaleString().split(' ')[0]}
                <div class="material-symbols-outlined arrow-forward" onClick={() => onclick('next')}>
                    arrow_forward
                </div>
            </div>
            { !salesState.sales ? <div>查無資料</div> 
            :
            <div>
                {salesState.sales.map(sale => {
                    return (
                        <div className="flex g-1">{sale.service == 'fix' ?
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
          
        </div>
    )
}

export default Sale