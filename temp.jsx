import { useEffect, useState, Navigate } from 'react';
import { useLoaderData, NavLink, Outlet, Link } from 'react-router-dom';
import { ajax_get } from '../lib/libs';
import _ from 'lodash';

const API_URL = 'https://localhost:7123/api/merchandise';
const limit = 15;

export async function loader({ params }) {
    let toLastPage = false;
    const allItems = await ajax_get(API_URL);
    const pages = _.range(_.ceil(_.size(allItems) / limit));
    const remain = _.size(allItems) % limit;
    const pagesLength = pages.length;
    if (params.pageN > _.ceil(_.size(allItems) / limit) + 1) {
        toLastPage = true;
    }
    return { allItems, pages, toLastPage, remain, pagesLength };
}

export default function Table({ keyword }) {
    const [home, setHome] = useState(false);
    const [items, setItems] = useState([]);
    const { allItems, pages, toLastPage, remain, pagesLength } = useLoaderData();

    const [filteredItem, setFilteredItem] = useState([]);
    const [filteteredPage , setFilteredPage] = useState([]);
    
    useEffect(() => {
        setFilteredItem(allItems.filter(item => 
            item.title.toLowerCase().includes(keyword.toLowerCase())
        ))
    }, [keyword])

    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);
        if(keyword.length == 0)  {
            setFilteredItem(allItems);
            setFilteredPage(pages);
        }
        setFilteredPage(_.range(_.ceil(_.size(filteredItem) / limit)));
    }, [filteredItem])