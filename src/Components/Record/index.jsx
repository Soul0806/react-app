import React, { useEffect, useRef, useState, useMemo } from 'react'

// Comps 
import Popup from './Popup';

import { getDbSale } from '../Tire/useSale';
import { useSale } from '../Tire/useSale';
import { axi } from '../../lib/axios';
import { dt } from '../../lib/helper';
import FormText from '../custom/FormText';

// Third party lib
import { isEmpty, pick } from 'lodash';

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
    const { allSale, setAllsale, dbSale, setDbSale, id } = useSale([]);
    const [filteredSale, setFilteredSale] = useState([]);
    const [remove, setRemove] = useState(false);
    const [searchClose, setSearchClose] = useState(false);
    const [q, setQ] = useState('');

    const refSearch = useRef('');
    const ref = useRef(false);
    const refDate = useRef(new Date());

    const toggleSearchClose = {
        display: searchClose ? 'block' : 'none'
    }

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

    let nextBtn = {
        content: 'Next',
        className: 'custom-button-classname',
        onClick: (dp) => {
            refDate.current = dt.getNextday(refDate.current);
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
        document.getElementById('datepicker').innerHTML = "";

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
                buttons: [prevBtn, button, nextBtn],
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

    const handleSearch = (e) => {
        // setQ(e.target.value);
        const search = refSearch.current.value;
        const result = [];
        const groupSale = {};

        if (search.length !== 0) {
            setSearchClose(true);
            allSale.map(item => {
                const regex = new RegExp(search, 'i');
                const match = item.spec.match(regex);

                if (match) {
                    result.push(item);
                    if (!groupSale[item.date]) {
                        groupSale[item.date] = [item];
                    } else {
                        groupSale[item.date].push(item);
                    }
                }
            })
            console.log(groupSale);
        } else {
            setSearchClose(false);
        }

        setFilteredSale(groupSale);
    }

    const searchDelete = () => {
        refSearch.current.value = '';
        setSearchClose(false);
        setFilteredSale([]);
    }

    const inputSpecWidth = {
        id: 'width',
        className: 'spec_width form__input',
        label: '寬度',
        placeholder: '寬度',
    }

    return (
        <>

            {/* <div className="form__group">
                <input className="form__input" type="text" />
                <label for="">123</label>
            </div> */}

            <div className="record-wrapper">
                <div className="flex-col">
                    <div className="flex g-1 a-i-center">
                        <FormText {...inputSpecWidth} />
                        <span>/</span>
                        <FormText {...inputSpecWidth} />
                        <span>-</span>
                        <FormText {...inputSpecWidth} />
                    </div>
                    <div className="flex">
                        <input className="search" type="text" ref={refSearch} onChange={handleSearch} />
                        <span style={toggleSearchClose} className="material-symbols-outlined search-close" onClick={searchDelete}>Close</span>
                    </div>
                    <div>
                        {/* {filteredSale.map(item => (
                            <div key={item.id} className="flex g-1">
                                <div>{item.spec}</div>
                                <div>{item.createdAt}</div>
                            </div>
                        ))} */}
                        {Object.keys(filteredSale).map(key => {
                            return (
                                <ul>
                                    <li>{key}</li>
                                    <ul>
                                        {filteredSale[key].map(item => (
                                            <li>{item.spec}</li>
                                        ))}
                                    </ul>
                                </ul>
                            )
                        }
                            // <>
                            //     <div>{key}</div>
                            //     <div key={filteredSale[key].id} className="flex g-1">
                            //         <div>{filteredSale[key].spec}</div>
                            //         <div>{filteredSale[key].createdAt}</div>
                            //     </div>
                            // </>
                        )}
                    </div>
                </div>
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
                    <div className="records">
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
    return (
        <div className="record">
            {sale.service == 'fix' ? <div className="fix_pseudo">補</div>
                :
                <>
                    <div className="sale_pseudo">售</div>
                    <div>{sale.spec}</div>
                    <div>{sale.quantity}</div>
                </>
            }
            <div className="d-sign">{sale.price}</div>
            {sale.note &&
                <>
                    <div className="star_pseudo"></div>
                    <div className="note">
                        <div className="title flex j-c-between">
                            <span>ID: {sale.id}</span>
                            <span className="del"><span className="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                                delete
                            </span></span>
                        </div>
                        <div className="desc">{sale.note}</div>
                    </div>

                </>
            }
            {/* <div className="flex f-1 j-c-end red" style={invisible}>
                <div className="flex">
                    <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                        {sale.pay == 'cash' && 'monetizaoutlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                        {sale.pay == 'cash' && 'monettion_on'}
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
            </div> */}
        </div>
    )
}

export default Record