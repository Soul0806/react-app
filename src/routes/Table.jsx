import { useEffect, useState, Navigate } from 'react';
import { useLoaderData, NavLink, Outlet, Link } from 'react-router-dom';
import { ajax_get } from '../lib/libs';

const API_URL = 'https://localhost:7123/api/merchandise';
const limit = 15;

export async function loader({ params }) {
    let toLastPage = false;
    const allProducts = await ajax_get(API_URL);
    const allProductsLength = Object.keys(allProducts).length;
    const remain = allProductsLength % limit;
    const pages = [...Array(Math.ceil(allProductsLength / limit)).keys()];
    const pagesLength = pages.length;
    if (params.pageN > pages + 1) {
        toLastPage = true;
    }

    return { pages, toLastPage, remain, pagesLength };
}

export default function Table() {
    const [home, setHome] = useState(false);
    const { pages, toLastPage, remain, pagesLength } = useLoaderData();

    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);

    })
    return (
        <>
            <div class="pages">
                <span>&lt;</span>
                {pages.map(p => (
                    <span key={p}>
                        <NavLink style={({ isActive, isPending }) => {
                            if (home && p == 0) {
                                isActive = true;
                            }
                            return {
                                fontWeight: isActive ? "bold" : "bold",
                                color: isActive ? "red" : "black",
                                cursor: isActive ? "text" : ""
                            };
                        }}
                            to={`page/${p + 1}`}>{p + 1} </NavLink>
                    </span>
                ))}
                <span>&gt;</span>
            </div>
            <Outlet context={{ limit, remain, pagesLength }} />
        </>
    )
}