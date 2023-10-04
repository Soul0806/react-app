import React, { useEffect, useRef, useState, useMemo, useInsertionEffect } from 'react'

// Comps 
import SaleForm from './SaleForm';
import GroupView from '../Custom/GroupView';
import FormText from '../Custom/FormText';

import { getDbSale, useSale } from '../Tire/useSale';

// lib 
import { axi } from '../../lib/axios';
import { dt, Dom } from '../../lib/helper';

// Third party lib
import { isEmpty } from 'lodash';

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';
import Test from '../Test';

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
    const [groupViewShow, setGroupViewShow] = useState(false);
    const [q, setQ] = useState('');

    const refSearch = useRef('');
    const ref = useRef(false);
    const refDate = useRef(new Date());
    const refDialogsale = useRef(null);

    const toggleSearchClose = {
        display: searchClose ? 'block' : 'none'
    }

    const toggleGroupViewShow = {
        visibility: groupViewShow ? 'visible' : 'hidden',
        opacity: groupViewShow ? '.9' : '0'
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

    const groupViewProps = {
        props: ['spec', 'note']
    }

    const salesState = useMemo(() => {
        return {
            dbSale, setDbSale, id
        }
    }, [dbSale, setDbSale, id])

    useEffect(() => {
        const modal = document.querySelector('.record__operate__groupview');
        const modelDimensions = modal.getBoundingClientRect();

    }, [filteredSale])

    useEffect(() => {
        document.getElementById('datepicker').innerHTML = "";

        if (ref.current) {
            Dom('.dialog__sale__open').event('click', () => {
                refDialogsale.current.showModal();
            })
            Dom('.dialog__close').event('click', () => {
                refDialogsale.current.close();
            })
            Dom(refDialogsale.current).event('click', (e) => {
                const dialogDimensions = refDialogsale.current.getBoundingClientRect();
                if (
                    e.clientX > dialogDimensions.right ||
                    e.clientX < dialogDimensions.left ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    refDialogsale.current.close();
                }

            })

            // Dom('.overlap').event('click', (e) => {
            //     refSearch.current.value = '';
            //     setSearchClose(false);
            //     setGroupViewShow(false);
            // });
            const picker = new AirDatepicker('#datepicker', {
                navTitles: {
                    days: dt.getTodayDate()
                },
                locale: localeEn,
                // inline: true,
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

    const handleSearch = (e) => {
        // setQ(e.target.value);
        const search = refSearch.current.value;
        const result = [];
        const groupSale = {};

        if (search.length !== 0) {
            setSearchClose(true);
            allSale.map(item => {
                const regex = new RegExp(search, 'i');
                const firstMatch = item.spec.match(regex) && item.note.match('@');
                const match = item.spec.match(regex) || item.note.match(regex);

                if (firstMatch) {
                    if (!groupSale[0]) {
                        groupSale[0] = [item];
                    } else {
                        groupSale[0].push(item);
                    }
                }
                if (match) {
                    result.push(item);
                    if (!groupSale[item.date]) {
                        groupSale[item.date] = [item];
                    } else {
                        groupSale[item.date].push(item);
                    }
                }
            })

            setGroupViewShow(true);
        } else {
            setGroupViewShow(false);
            setSearchClose(false);
        }

        setFilteredSale(groupSale);
    }

    const searchDelete = () => {
        refSearch.current.value = '';
        setSearchClose(false);
        setGroupViewShow(false);
        setFilteredSale([]);
    }

    const inputSpecWidth = {
        id: 'width',
        className: 'spec_width form__input',
        label: '寬度',
        placeholder: '寬度',
    }

    const inputSpec = {
        id: 'width',
        className: 'form__input',
        // label: '請輸入...',
        // placeholder: '請輸入...',
        ref: refSearch,
        onChange: handleSearch,
    }

    return (
        <>
            <div className="record">
                <div className="wrapper">
                    {/* <div className="overlap"></div> */}
                    <div className="record__sidebar">
                        <dialog className="dialog dialog__sale" ref={refDialogsale}>
                            <div className="wrapper">
                                <div className="dialog__menu">
                                    <h5 className="dialog__title">新增銷售</h5>
                                    <span className="material-symbols-outlined dialog__close">
                                        Close
                                    </span>
                                </div>
                                <SaleForm salesState={salesState} />
                            </div>
                        </dialog>
                        <div className="record__operate">
                            <div className="record__operate__insert">
                                {/* <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling"> */}
                                <button type="button" className="btn btn-sm btn-secondary dialog__sale__open">
                                    新增銷售
                                </button>
                            </div>
                            <div className="record__operate__input">
                                <input id="" type="text" ref={refSearch} onChange={handleSearch} />
                                <svg class="feather feather-search" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                            </div>
                            <div className="record__operate__groupview" style={toggleGroupViewShow}>
                                <div className="groupview__wrapper">
                                    <div className="groupview__menu">
                                        <svg className="groupview__close" style={toggleSearchClose} onClick={searchDelete} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                                        </svg>
                                        {/* <span className="material-symbols-outlined groupview__close" style={toggleSearchClose} onClick={searchDelete}>Close</span> */}
                                    </div>
                                    <GroupView filteredSale={filteredSale} groupViewProps={groupViewProps} />
                                </div>
                            </div>
                        </div>
                        <input id="datepicker" />
                    </div>
                    <section className="record__view">
                        <div className="record__overview__view">
                            {!isEmpty(salesState.dbSale) &&
                                <>
                                    {salesState.dbSale.map(sale => {
                                        return <Sale key={sale.id} sale={sale} salesState={salesState} remove={remove} />
                                    })
                                    }
                                </>
                            }
                        </div>
                    </section>
                </div>
            </div>
            {/* <Popup salesState={salesState} /> */}
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

    return (
        <div className="list">
            {sale.service == 'fix' ? <div className="fix">補</div>
                :
                <>
                    <div className="sale">售</div>
                    <div>{sale.spec}</div>
                    <div>{sale.quantity}</div>
                </>
            }
            <div className="list__price">{sale.price}</div>
            {sale.note &&
                <>
                    {/* <div className="star__pseudo"></div> */}
                    <div className="list__note">
                        <span>ID: {sale.id}</span>
                        <span className="del"><span className="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                            delete
                        </span></span>
                        <div className="list__note__desc">{sale.note}</div>
                    </div>
                </>
            }
        </div>
    )
}

export default Record