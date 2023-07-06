import { useEffect, useState, useContext, useInsertionEffect } from 'react';
import CustomSelect from './CustomSelect';

import { AppContext } from '../Tire/Tire';

import _, { keysIn } from 'lodash'
// import { useLocation, useNavigate, useMatch } from 'react-router-dom';

// import { ajax_post, ajax_put, lowerize } from '../lib/helper';

// import { AppContext } from "./Table";

// const API_URL = 'https://localhost:7123/api/merchandise';


function Popup() {
    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    const optionInch = _.range(12, 23);
    const { inches } = useContext(AppContext);

    const [selling, setSelling] = useState({
        place: '',
        inch: 12,
        specs: [],
        spec: '',
        quantity: 1,
    });

    useEffect(() => {
        setSelling((prev) => {
            return {
                ...prev,
                specs: Object.keys(inches[selling['inch']]['spec'])
            }
        })
    }, [selling.inch])

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        setSelling(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function handleSubmit() {
        return false;
    }
    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">詳細銷售</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method="post" onSubmit={() => handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3 modal-place" onChange={handleChange}>
                                <div>
                                    <label htmlFor="store">
                                        <input type="radio" id="store" name="place" value="store" />店內</label>
                                </div>
                                <div>
                                    <label htmlFor="out-service">
                                        <input type="radio" id="out-service" name="place" value="out-service" />外出
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 modal-service" onChange={handleChange}>
                                <div>
                                    <label htmlFor="fix">
                                        <input type="radio" id="fix" name="service" value="fix" />補胎</label>
                                </div>
                                <div>
                                    <label htmlFor="tire-change">
                                        <input type="radio" id="tire-change" name="service" value="tire-change" />換胎
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 modal-tire" onChange={handleChange}>
                                <div>規格</div>
                                <div>
                                    <CustomSelect name="inch" option={_.range(12, 23)} />
                                </div>
                                <div>
                                    <CustomSelect name="spec" option={selling['specs']} />
                                </div>
                            </div>
                            <div className="mb-3 modal-quantity" onChange={handleChange} >
                                <div>數量</div>
                                 <div>
                                     <CustomSelect name="quantity" option={_.range(1, 11)} />
                                 </div>
                            </div>
                            <div className="mb-3 input-icon modal-input-icon">
                                <input className="price" name="price" type="text" placeholder="0.0" onChange={handleChange}/>
                                <i>$</i>
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
                                 <input id="note" name="note" type="text" onChange={handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit"
                                    className="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {JSON.stringify(selling)}
        </div>
    )
}
export default Popup;