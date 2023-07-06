import React, { useContext, useState, useImperativeHandle, useRef, useEffect, useReducer } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import _ from 'lodash';

import { AppContext } from './Tire';
import Note from './Note';
import CustomSelect from '../Component/CustomSelect'
import Popup from '../Component/Popup';

// import { dd } from '../../lib/helper';

import { combineTire } from './useTire';
// const option = _.range(1, 11);

// import { ACTION } from './Tire';

// export const ACTION = {
//     INCREASE: 'increase',
//     DECREASE: 'decrease',
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case ACTION.INCREASE:
//             const num = action.payload.num;
//             const inch = action.payload.inch;
//             const spec = action.payload.s;
//             console.log({ ...state, [inch]: { ...state[inch], spec: { ...state[inch]['spec'], [spec]: num + 1 } } });
//             return { ...state, [inch]: { ...state[inch], spec: { ...state[inch]['spec'], [spec]: num + 1 } } }
//         default:
//             return state;
//     }

// }

function Spec() {
    const noteRef = useRef([]);
    const param = useParams();
    const { specs, inches, setInches, areas } = useContext(AppContext);
    const [target, setTarget] = useState('');
    const [behavior, setBehavior] = useState('insert');
    const [btnAbort, setBtnAbort] = useState(false);

    const { ref } = useOutletContext();

    const sale = localStorage.getItem('sale') || [];

    // let [state, dispatch] = useReducer(reducer, inches);
    useImperativeHandle(ref, () => {
        return {
            cancelTarget: () => setTarget(''),
            cleanNoteRef: () => noteRef.current = [],
            cleanNote: () => cleanNote()
        }
    })

    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    function fadeIn(el) {
        el.style.animation = 'fade-in 1s linear';
    }

    function cleanNote() {
        const note = document.querySelector('.note');
        note.replaceChildren();
    }

    function note(s) {
        const note = document.querySelector('.note');
        let div = document.createElement("div");
        div.className = 'noti';
        div.appendChild(document.createTextNode(s));
        noteRef.current.push(div);

        if (noteRef.current.length > 4) {
            noteRef.current.shift();
            note.removeChild(note.firstElementChild);
        }

        if (noteRef.current.length == 1) {
            note.appendChild(div);
            // fadeIn(noteRef.current[noteRef.current.length - 1])
        } else {
            setBtnAbort(true);
            let index = 0;
            let lastIndex = noteRef.current.length - 1;
            let offset = -50;
            while (index < lastIndex) {
                // noteRef.current[index].style.top = getOffset(noteRef.current[index]).top + (offset) + "px";
                let move = (lastIndex - index) * (offset) + "px"
                noteRef.current[index].style.transform = `translateY(${move})`;
                index++;
            }
            document.querySelector('.noti').addEventListener("transitionend", (event) => {
                note.appendChild(div);
                setBtnAbort(false);
            });
        }
    }

    function onclick(s, action) {
        if (btnAbort) { return undefined }
        return () => {
            const inch = s.slice(-2);
            const num = inches[inch]['spec'][s];
            if (action == 'add') {
                // dispatch({ type: ACTION.INCREASE, payload: { inch: inch, s: s, num: num } })
                note(s);
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num + 1 } } }
                })
            } else {
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num - 1 } } }
                })
            }
            setTarget(s);
        }
    }

    function active(s) {
        return {
            color: s == target ? 'red' : 'black'
        }
    }

    function handleBehav(e) {
        setBehavior(e.target.value);
    }

    function reset() {
        combineTire().then(res => {
            areas.map(area => localStorage.setItem(area.path, JSON.stringify(res)))
        });
        combineTire().then(res => setInches(res));
        ref.current.cancelTarget();
        ref.current.cleanNote();
        ref.current.cleanNoteRef();
    }
    return (
        <>
            <div className="spec-wrapper">
                <div className="reset"><button onClick={reset}>Reset</button></div>
                <div className="behavior" onChange={handleBehav}>
                    <label htmlFor="insert">
                        <input type="radio" id="insert" value="insert" name="behavior" checked={behavior == 'insert'} />新增
                    </label>
                    <label htmlFor="sale">
                        <input type="radio" id="sale" value="sale" name="behavior" />銷售
                    </label>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling">
                        <span>詳細銷售</span>
                    </button>
                    {/* <button onclick={() => openSellingModel}></button> */}
                </div>
                {specs.map((spec, idx) => {
                    const num = inches[spec.slice(-2)]['spec'][spec];
                    const btnStyle = (num == 0) ? { opacity: 0.7, cursor: 'not-allowed' } : { opacity: 1 };
                    const disabled = (num == 0) ? true : false;
                    return <div className="item" key={idx}>
                        <div className="spec">{spec}</div>
                        <div className="num" style={active(spec)}>{num}</div>
                        <div className="mode">
                            {behavior == 'insert' ?
                                <>
                                    <button className="button minor" style={btnStyle} disabled={disabled} onClick={onclick(spec, 'minor')}> - </button>
                                    <button className="button increase" onClick={onclick(spec, 'add')}> + </button>
                                </>
                                :
                                <>
                                    <button className="button minor" style={btnStyle} disabled={disabled} > 售 </button>
                                    <CustomSelect option={_.range(0, num + 1)} />
                                    <div className="input-icon">
                                        <input className="price " type="text" placeholder="0.0" />
                                        <i>$</i>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }
                )}
                {sale}
            </div>
            <Note />
            <Popup />
        </>
    )
}

export default React.forwardRef(Spec)