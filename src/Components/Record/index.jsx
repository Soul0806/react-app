import React, { useEffect, useRef, useState, useMemo } from 'react'

// Comps 
import Popup from './Popup';

import { getDbSale } from '../Tire/useSale';
import { useSale } from '../Tire/useSale';
import { axi } from '../../lib/axios';
import { dt } from '../../lib/helper';

// Third party lib
import { isEmpty } from 'lodash';

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}


function Record() {
    const [dbSale, setDbSale, id] = useSale([]);
    const [remove, setRemove] = useState(false);
    const ref = useRef(false);
    const refDate = useRef(new Date());


    let button = {
        content: 'Today',
        className: 'custom-button-classname',
        onClick: (dp) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
            refDate.current = date;
        }
    }
    let prevBtn = {
        content: 'Prev',
        className: 'custom-button-classname',
        onClick: (dp) => {
            refDate.current = dt.getLastday(refDate.current);
            dp.selectDate(refDate.current);
            dp.setViewDate(refDate.current);
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
                    days: dt.getTodayDate()
                },
                locale: localeEn,
                inline: true,
                buttons: [prevBtn, button],
                onSelect: function ({ date, datepicker }) {
                    if (!date) return;
                    datepicker.nav.$title.innerHTML = date.toDate();
                    getDbSale(date.toDate()).then(({ id, sale: res }) => salesState.setDbSale(res))
                },
            });
        }
        return () => {
            ref.current = true;
        }
    }, [])

    function handleToggle() {
        setRemove(prev => !prev);
    }
    return (
        <>
            <div className="record-wrapper">
                <div className="operate-col">
                    <div className="task-bar">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling">
                            <span>詳細銷售</span>
                        </button>
                        <div className="action">
                            <span>操作</span>
                            <input type="checkbox" onClick={handleToggle} />
                        </div>
                    </div>
                    <div id="datepicker"></div>
                </div>
                {isEmpty(salesState.dbSale) ? <div>No Data</div> :
                    <div className="record">
                        {salesState.dbSale.map(sale => {
                            return <Sale key={sale.id} sale={sale} salesState={salesState} remove={remove} />
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
    if (confirm('Delete')) {
        salesState.setDbSale(sale => {
            return sale.filter(s => {
                if (s.id != id)
                    return s;
            })
        });
        const res = await axi.delete(`http://localhost:9000/sale/${id}`);
    }
}


function Sale(props) {
    const { sale, salesState, remove } = props;
    const invisible = {
        visibility: remove ? 'visible' : 'hidden'
    }
    
    function handleTitle(id) {
        const result = salesState.dbSale.filter(sale => sale.id == id);
        return result[0].note;
    }
    return (
        <div className="flex g-1" data-bs-toggle="tooltip" data-bs-placement="right" title={handleTitle(sale?.id)}>{sale?.id}
            {sale.service == 'fix' ? <div>補</div>
                :
                <>
                    <div>售</div>
                    <div>{sale.spec}</div>
                    <div>{sale.quantity}</div>
                </>
            }

            <div className="d-sign">{sale.price}</div>
            <div className="flex f-1 j-c-end red" style={invisible}>
                <div className="flex">
                    <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                        {sale.pay == 'cash' && 'monetization_on'}
                        {sale.pay == 'credit' && 'credit_card'}
                        {sale.pay == 'transfer' && 'phone_iphone'}
                    </div>
                    <div className="f-1">
                        {sale.createdAt.split(' ')[1]}
                    </div>
                    <div className="del"><span className="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                        delete
                    </span></div>
                </div>
            </div>
        </div>
    )
}

export default Record