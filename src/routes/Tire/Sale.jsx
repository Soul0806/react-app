import React, { useEffect, useState } from 'react'
import { getToday, getYesterday } from '../../lib/helper';

const today = getToday();
const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}

function Sale({ salesState }) {

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }, [])

    function onclick(to) {
        if(to == 'prev') {
            salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[getYesterday()]);
        }
    }
    return (
        <div className="sale">
            <div className="date flex g-1">
                <div class="material-symbols-outlined" onClick={() => onclick('prev')}>
                    arrow_back
                </div>
                {today}
                <div class="material-symbols-outlined" onClick={() => onclick('next')}>
                    arrow_forward
                </div>
            </div>
            { salesState.sales && <div>查無資料</div> } 
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
    )
}

export default Sale