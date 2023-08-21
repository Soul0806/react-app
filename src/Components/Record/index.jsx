import React, { useEffect, useRef, useState, useMemo } from 'react'
// import { useQuery } from 'react-query';
import useSWR from 'swr'

import { getDbSale } from '../../routes/Tire/useSale';
import { useSale } from '../../routes/Tire/useSale';
import { isEmpty } from 'lodash';
import { axi } from '../../lib/axios';

// Components 
import Popup from './Popup';

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';


const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}

// const options = {
//     method: "POST",
//     body: JSON.stringify({ fileName: 'static/sale.json'}),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// }

// const fetcher = (...args) => fetch(...args, options).then(res => res.json()); 

function Record() {
    const [dbSale, setDbSale, id] = useSale([]);
    const [today, setToday] = useState(new Date());
    const [remove, setRemove] = useState(false);
    const ref = useRef(false);

    // const {data}  = useSWR('http://localhost:9000/io/readFile', fetcher);

    let button = {
        content: 'Today',
        className: 'custom-button-classname',
        onClick: (dp) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
        }
    }

    const salesState = useMemo(() => {
        return {
            dbSale, setDbSale, id
        }
    }, [dbSale, setDbSale, id])

    useEffect(() => {
        if (ref.current) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })

            const picker = new AirDatepicker('#datepicker', {
                navTitles: {
                    days: today.toDate()
                },
                locale: localeEn,
                inline: true,
                buttons: [button],
                onSelect: function ({ date, datepicker }) {
                    datepicker.nav.$title.innerHTML = date.toDate();
                    // this.navTitles.days = date.toDate();
                    getDbSale(date.toDate()).then(({ id, sale: res }) => salesState.setDbSale(res))
                    setToday(date);
                },
            });
        }
        return () => {
            ref.current = true;
        }
    }, [])

    // function toLast() {
    //     const lastDate = dt.getLastday(today).toDate();
    //     // salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[lastDate] || []);
    //     getDbSale(lastDate).then(({ id, sale: res }) => salesState.setDbSale(res))
    //     setToday(prev => dt.getLastday(today))
    // }

    // function toNext() {
    //     const nextDate = dt.getNextday(today).toDate();
    //     // salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[nextDate] || []);
    //     getDbSale(nextDate).then(({ id, sale: res }) => salesState.setDbSale(res))
    //     setToday(prev => dt.getNextday(today))
    // }

    // function onclick(to) {
    //     if (to == 'last') {
    //         toLast();
    //     } else {
    //         toNext();
    //     }
    // }

    function handleClick() {
        setRemove(prev => !prev);
    }
    return (
        <>
            <div className="record-wrapper">
                test1
                <div className="operate-col">
                    <div className="task-bar">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling">
                            <span>詳細銷售</span>
                        </button>
                        <div className="action">
                            <span>操作</span>
                            <input type="checkbox" onClick={handleClick} />
                        </div>
                    </div>
                    <div id="datepicker"></div>
                </div>
                {isEmpty(salesState.dbSale) ? <div>No Data</div> :
                    <div className="record">
                        {salesState.dbSale.map(sale => {
                            return <SaleTmp key={sale.id} sale={sale} salesState={salesState} remove={remove} />
                        })
                        }
                    </div>
                }
            </div>
            <Popup salesState={salesState} />
        </>
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
        const res = await axi.delete(`http://localhost:9000/sale/${id}`);
    }
}


function SaleTmp({ sale, salesState, remove }) {
    return (
        <div className="flex g-1">{sale?.id}
            {sale.service == 'fix' ? <div>補</div>
                :
                <>
                    <div>售</div>
                    <div className="f-g-1">{sale.spec}</div>
                    <div>{sale.quantity}</div>
                </>
            }
            <div className="d-sign">{sale.price}</div>
            {remove &&
                <>
                    <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                        {sale.pay == 'cash' && 'monetization_on'}
                        {sale.pay == 'credit' && 'credit_card'}
                        {sale.pay == 'transfer' && 'phone_iphone'}
                    </div>
                    <div className="created-at">
                        {sale.createdAt.split(' ')[1]}
                    </div>
                    <div className="del"><span className="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                        delete
                    </span></div>
                </>
            }
        </div>
    )
}

export default Record