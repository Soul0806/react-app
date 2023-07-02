import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { ajax_get, uuid, isObjectEmpty } from '../../lib/helper';
import _ from 'lodash';

export const areas = [
    { name: '隔壁 樓上', path: 'upstair' },
    { name: '隔壁 樓下', path: 'downstair' }
]

export async function combineTire(signal = {}) {

    const API_TIRE = 'https://localhost:7123/api/tire';
    const [head, last] = [12, 22];
    const inchRange = _.range(head, last + 1);

    let inchTmplt = {};
    inchRange.map(inch => inchTmplt[inch] = { id: uuid(), spec: {}, active: false })

    const data = await ajax_get(API_TIRE, signal);
    const specs = await data.json();

    specs.map(spec => {
        const name = spec.name;
        const inch = name.slice(-2);
        inchTmplt[inch]['spec'][name] = 0;
    })
    return inchTmplt;
}

export const useTire = () => {
    const param = useParams();
    const [inches, setInches] = useState({});

    useEffect(() => {
        !isObjectEmpty(inches) && setInches(JSON.parse(localStorage.getItem(param.area)))
    }, [param])

    useEffect(() => {
        !isObjectEmpty(inches) && localStorage.setItem(param.area, JSON.stringify(inches))
    }, [inches])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (localStorage.length != areas.length) {
            areas.map(area => {
                combineTire(signal).then(res => {
                    setInches(res);
                    localStorage.setItem(area.path, JSON.stringify(res))
                });
            })
        } else {
            setInches(prev => {
                return JSON.parse(localStorage.getItem(param.area));
            });
        }
        return () => controller.abort()
    }, [])

    return [ inches, setInches, areas, combineTire ] 
}




