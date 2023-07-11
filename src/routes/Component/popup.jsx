import { useEffect, useState, useContext, useInsertionEffect, useRef } from 'react';
import CustomSelect from './CustomSelect';

import { AppContext } from '../Tire/Tire';

import { getDateTime, getTodayDate } from '../../lib/helper';

import _ from 'lodash'

function Popup({ salesState }) {

    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)



    const optionInch = _.range(12, 23);
    const { inches } = useContext(AppContext);
    const [specs, setSpecs] = useState([]);

    const [selling, setSelling] = useState({
        place: '',
        service: '',
        inch: '',
        spec: '',
        price: '0',
        quantity: '',
        pay: '',
        note: '',
        date: getTodayDate(),
        createdAt: getDateTime()
    });
    const styling = {
        opacity: !selling.spec && selling.service != 'fix' ? '.4' : 1,
        cursor: !selling.spec && selling.service != 'fix' ? 'not-allowed' : 'pointer'
    }

    useEffect(() => {
        if (selling.inch) {
            setSpecs((prev) => {
                return Object.keys(inches[selling['inch']]['spec']).sort();
            })
        }
    }, [selling.inch])

    function handleChange(e) {
        const { name, value } = e.target;
        setSelling(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        let date = getTodayDate();
        let localValue = JSON.parse(localStorage.getItem('sale')) || {};
        if (!JSON.parse(localStorage.getItem('sale'))?.[date]) {
            localStorage.setItem('sale', JSON.stringify({ ...localValue, [date]: [selling] }));
        } else {
            let itemSale = JSON.parse(localStorage.getItem('sale'))[date];
            localStorage.setItem('sale', JSON.stringify({ [date]: [...itemSale, selling] }));
        }
        salesState.setSales(prev => {
            return [...prev, selling]
        });
        modal.toggle();
    }

    function handleClose() {
        // setSelling({
        //     place: '',
        //     service: '',
        //     inch: '',
        //     spec: '',
        //     price: '',
        //     quantity: 1,
        //     pay: '',
        //     note: ''
        // })
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">詳細銷售</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3 modal-place" >
                                    <div>
                                        <label htmlFor="store">
                                            <input type="radio" id="store" name="place" value="store" onChange={handleChange} checked={selling.place == 'store' ? 'checked' : ''} />店內</label>
                                    </div>
                                    <div>
                                        <label htmlFor="out-service">
                                            <input type="radio" id="out-service" name="place" value="out-service" onChange={handleChange} checked={selling.place == 'out-service' ? 'checked' : ''} />外出
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 modal-service">
                                    <div>
                                        <label htmlFor="fix">
                                            <input type="radio" id="fix" name="service" value="fix" onChange={handleChange} checked={selling.service == 'fix' ? 'checked' : ''} />補胎</label>
                                    </div>
                                    <div>
                                        <label htmlFor="tire-change">
                                            <input type="radio" id="tire-change" name="service" value="tire-change" onChange={handleChange} checked={selling.service == 'tire-change' ? 'checked' : ''} />換胎
                                        </label>
                                    </div>
                                </div>
                                {selling.service != 'fix' &&
                                    <div className="mb-3 modal-tire" onChange={handleChange}>
                                        <div>規格</div>
                                        <div>
                                            <CustomSelect name="inch" option={optionInch} selling={selling} />
                                        </div>
                                        {specs.length != 0 &&
                                            <>
                                                <div>
                                                    <CustomSelect name="spec" option={specs} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                }
                                <div className="mb-3 modal-quantity" onChange={handleChange} >
                                    <div>數量</div>
                                    <div>
                                        <CustomSelect name="quantity" option={_.range(1, 11)} />
                                    </div>
                                </div>
                                <div className="mb-3 input-icon modal-input-icon">
                                    <input className="price" name="price" type="text" placeholder="0.0" value={selling.price} onChange={handleChange} />
                                    <i>$</i>
                                    {selling.service == 'fix' &&
                                        <>
                                            <div>
                                                <label htmlFor="twohundred">
                                                    <input type="radio" id="twohundred" name="price" value="200" onChange={handleChange} />200</label>
                                            </div>
                                            <div>
                                                <label htmlFor="threehunderd">
                                                    <input type="radio" id="threehunderd" name="price" value="300" onChange={handleChange} checked="checked" />300
                                                </label>
                                            </div>
                                            <div>
                                                <label htmlFor="custom">
                                                    <input type="radio" id="custom" name="price" value="" onChange={handleChange} />自訂
                                                </label>
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className="mb-3 modal-pay" onChange={handleChange}>
                                    <div className="text-pay">付款方式</div>
                                    <div>
                                        <label htmlFor="cash">
                                            <input type="radio" id="cash" name="pay" value="cash" />現金</label>
                                    </div>
                                    <div>
                                        <label htmlFor="credit">
                                            <input type="radio" id="credit" name="pay" value="credit" />刷卡
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="transfer">
                                            <input type="radio" id="transfer" name="pay" value="transfer" />轉帳
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 modal-note">
                                    <label className="note" htmlFor="note">備註 </label>
                                    <input id="note" name="note" type="text" onChange={handleChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                    <button type="submit" style={styling}
                                        className="btn btn-primary">Send message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Popup;