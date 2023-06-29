import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

import { AppContext } from './Tire';

function Spec() {

    const param = useParams();
    const {  specs, inches, setInches, dispatch } = useContext(AppContext);
    const [target, setTarget] = useState('');

    function onclick(s, action) {
        return () => {
      
            const inch = s.slice(-2);
            const num = inches[inch]['spec'][s];
            if (action == 'add') {
                // dispatch({type: ACTION.INCREASE, payload: { inch: inch, s: s, num: num }})
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

    return (
        <div className="spec-wrapper">
            {specs.map((spec, idx) => {
                const num = inches[spec.slice(-2)]['spec'][spec];
                const btnStyle = (num == 0) ? { opacity: 0.7, cursor: 'not-allowed' } : { opacity: 1 };
                const disabled = (num == 0) ? true : false;
                return <div className="item" key={idx}>
                    <div className="spec">{spec}</div>
                    <div className="num" style={active(spec)}>{num}</div>
                    <button className="button minor" style={btnStyle} disabled={disabled} onClick={onclick(spec, 'minor')}> - </button>
                    <button className="button increase" onClick={onclick(spec, 'add')}> + </button>
                </div>
            }
            )}
        </div>
    )
}

export default Spec