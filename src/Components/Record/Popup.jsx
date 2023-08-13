import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import CustomSelect from '../../routes/Component/CustomSelect';
import { useTire } from '../../routes/Tire/useTire';

import { dt } from '../../lib/helper';
import { axi } from '../../lib/axios';
import FormRadio from '../custom/FormRadio';
import FormText from '../custom/FormText';

import _ from 'lodash'
import Litepicker from 'litepicker';


const WRITE_API = `http://localhost:9000/io/writeFile`;
const SALE_API_URL = `https://localhost:7123/api/Sale/`;

const toDate = dt.getTodayDate();

function Popup({ salesState }) {

    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    const optionInch = _.range(12, 23);
    const [inches] = useTire();
    const [specs, setSpecs] = useState([]);
    const navigate = useNavigate();
    const priceRef = useRef();

    const [selling, setSelling] = useState({
        id: '',
        place: '',
        service: '',
        inch: '',
        spec: '',
        price: '',
        quantity: '',
        pay: '',
        note: '',
        date: dt.getTodayDate(),
        createdAt: ''
    });

    const styling = {
        opacity: !selling.spec && selling.service != 'fix' ? '.4' : 1,
        cursor: !selling.spec && selling.service != 'fix' ? 'not-allowed' : 'pointer'
    }

    useEffect(() => {
        console.log(selling);
    }, [selling])

    useEffect(() => {
        if (selling.inch) {
            setSpecs((prev) => {
                return Object.keys(inches[selling['inch']]['spec']).sort();
            })
        }
    }, [selling.inch])


    useEffect(() => {
        selling.quantity && priceRef.current.focus();
    }, [selling.quantity])

    function handleChange(e) {
        console.log(salesState.id);
        e.target.name == 'price' && priceRef.current.focus();
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
        const content = {
            id: salesState.id,
            area: selling.place,
            service: selling.service,
            spec: selling.spec,
            price: selling.price,
            quantity: selling.quantity,
            pay: selling.pay,
            note: selling.note,
            date: selling.date,
            createdAt: dt.getDateTime()
        }

        const fileName = 'static/sale.json';
        const data = { fileName, content }
        axi.post(WRITE_API, data);
        // modal.toggle();
        navigate(0);
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
    const inputs = [
        {
            id: "price",
            type: "text",
            name: "price",
            value: selling.price,
            pattern: '^[^0a-zA-Z]\\d{1,}',
            label: "價格",
            onchange: onchange,
        }
    ]

    const inputRadioPlace = [
        {
            id: "store",
            type: "radio",
            name: "place",
            value: "store",
            label: "店內",
        },
        {
            id: "out-service",
            type: "radio",
            name: "place",
            value: "out-service",
            label: "外出",
        }
    ]

    const inputRadioService = [
        {
            id: "fix",
            type: "radio",
            name: "service",
            value: "fix",
            label: "補胎",
        },
        {
            id: "tire-change",
            type: "radio",
            name: "service",
            value: "tire-change",
            label: "換胎",
        }
    ]

    const inputRadioPrice = [
        {
            id: "custom",
            type: "radio",
            name: "price",
            value: "",
            label: "自訂",
        },
        {
            id: "twohundred",
            type: "radio",
            name: "price",
            value: "200",
            label: "200",
        },
        {
            id: "threehundred",
            type: "radio",
            name: "price",
            value: "300",
            label: "300",
        }
    ]

    const inputRadioPay = [
        {
            id: "cash",
            type: "radio",
            name: "pay",
            value: "cash",
            label: "現金",
        },
        {
            id: "credit",
            type: "radio",
            name: "pay",
            value: "credit",
            label: "刷卡",
        },
        {
            id: "transfer",
            type: "radio",
            name: "pay",
            value: "transfer",
            label: "轉帳",
        }
    ]

    function onchange(e) {
        setSelling(prev => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            }
        })
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

                        <form className="sale_popup" method="post" onSubmit={handleSubmit}>
                            <div className="mb-3 modal-place">
                                {inputRadioPlace.map(radio => {
                                    return <FormRadio {...radio} onchange={handleChange} />
                                })}
                                {
                                    !selling.place && <span className="invalid">請選擇地點</span>
                                }
                            </div>
                            <div className="mb-3 modal-service">
                                {inputRadioService.map(radio => {
                                    return <FormRadio {...radio} onchange={onchange} />
                                })}
                                {
                                    !selling.service && <span className="invalid">請選擇服務</span>
                                }
                            </div>

                            {selling.service != 'fix' &&
                                <div className="mb-3 modal-tire" onChange={handleChange}>
                                    <div>規格</div>
                                    <div>
                                        <CustomSelect name="inch" option={optionInch} selling={selling} />
                                    </div>
                                    {specs.length != 0 &&
                                        <div>
                                            <CustomSelect name="spec" option={specs} />
                                        </div>
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
                                <input ref={priceRef} className="price" name="price" type="text" placeholder="0.0" value={selling.price} onChange={handleChange} />
                                <i>$</i>
                                {selling.service == 'fix' &&
                                    <>
                                        {inputRadioPrice.map(radio => {
                                            return <FormRadio {...radio} onchange={onchange} />
                                        })}
                                    </>
                                }
                            </div>
                            <div className="mb-3 modal-pay">
                                {inputRadioPay.map(radio => {
                                    return <FormRadio {...radio} onchange={onchange} />
                                })}
                            </div>
                            <div className="mb-3 modal-note">
                                <label className="note" htmlFor="note">備註 </label>
                                <input id="note" name="note" type="text" onChange={handleChange} />
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Popup;