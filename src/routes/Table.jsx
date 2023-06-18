import { useEffect, createContext, useState } from 'react';
import { useLoaderData, NavLink, Outlet, Link } from 'react-router-dom';
import { ajax_get } from '../lib/libs';

import Paging from './Paging';

import _ from 'lodash'

const API_URL = 'https://localhost:7123/api/merchandise';
const limit = 15;

export const AppContext = createContext();

export async function loader({ params }) {
    const items = await ajax_get(API_URL).then(res => res.json());
    const itemsLen = _.size(items);
    const pagesLen = _.ceil(itemsLen / limit);
    // const pages = _.range(1, pagesLen + 1);
    const remain = itemsLen % limit;
    
    return { remain, pagesLen };
}

export default function Table() {

    const [ i , setI] = useState('');
    const [ pages, setPages ] = useState([]);
    const { items, remain, pagesLen } = useLoaderData();

    useEffect(() => {
        ajax_get(API_URL).then(res => res.json().then(data => setI(data)));
    }, [])

    useEffect(() => {
        setPages(calcPage(i));
    }, [i])

    const calcPage = (items) => {
        let itemsLen = _.size(items);
        let pagesLen = _.ceil(itemsLen / limit);
        return _.range(1, pagesLen + 1);
    }
    
    return (
        <>
            <AppContext.Provider value={{pages, i}}>
                <section>
                    <Paging />
                    <Outlet context={{ limit, remain, pagesLen }} />
                </section>
            </AppContext.Provider>
        </>
    )
}