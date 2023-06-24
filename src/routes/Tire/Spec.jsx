import React, { useContext, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

import { AppContext } from './Tire';
import { useState } from 'react';
import { useTire } from './useTire';
function Spec() {
    const param = useParams();
    const [num, setNum] = useState(0);
    const [test, setTest] = useState({});

    const { specs } = useOutletContext();
    const { inches, setInches } = useContext(AppContext);

    useEffect(() => {
        console.log(inches);
    }, [inches])

    function onclick(s, action) {
        const inch = s.slice(-2);
        let num = inches[inch]['spec'][s] + 1;
        if (action == 'add') {
            setInches(prev => {
                return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num } } }
            })
        }
    }

    return (
        <section>
            <ul>
                {specs.map((spec, idx) => (
                    <>
                        <li key={idx}>
                            <button className="minor" onClick={() => onclick(spec, 'minor')}> - </button>
                            <span onClick={() => handleNum(spec)}>{spec}</span>
                            <button className="increase" onClick={() => onclick(spec, 'add')}> + </button>
                            {inches[spec.slice(-2)]['spec'][spec]}
                        </li>
                    </>
                ))}
            </ul>
        </section>
    )
}

export default Spec