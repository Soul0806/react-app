import { useEffect, useState } from 'react';

import { ajax_get, uuid } from '../../lib/helper';
import _ from 'lodash';

const API_TIRE = 'https://localhost:7123/api/tire';
const [head, last] = [12, 22];
const inchRange = _.range(head, last + 1);

export const useTire = () => {

    const [inches, setInches] = useState({})
    
    const fetchTire = async (obj) => {
        const data = await ajax_get(API_TIRE);
        const specs = await data.json();

        specs.map(s => {
            const inch = s.name.slice(-2);
            obj[inch]['spec'][s.name] = 0;
        })
    }

    useEffect(() => {
        let obj = {};
        inchRange.map(inch => {
            obj[inch] = { id: uuid(), spec: {}, active: false }
        })

        fetchTire(obj);
        setInches(prev => {
            return obj;
        })
    }, [])

    return { inches, setInches }
}




