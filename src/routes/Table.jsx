import { useEffect, useState, Navigate } from 'react';
import { useLoaderData, NavLink, Outlet, Link } from 'react-router-dom';
import { ajax_get } from '../lib/libs';
import _ from 'lodash'

const API_URL = 'https://localhost:7123/api/merchandise';
const limit = 15;

export async function loader({ params }) {
    const items = await ajax_get(API_URL);
    const itemsLen = _.size(items);
    const pagesLen = _.ceil(itemsLen / limit);
    const pages = _.range(1, pagesLen + 1);
    const remain = itemsLen % limit;
    return { pages, remain, pagesLen };
}

export default function Table() {
    const [home, setHome] = useState(false);
    const {pages, remain, pagesLen} = useLoaderData();
    const isAvtive = 
        ({ isActive, isPending }) => {
            if (home && p == 1) {
                isActive = true;
            }
            return {
                fontWeight: isActive ? "bold" : "bold",
                color: isActive ? "red" : "black",
                cursor: isActive ? "text" : ""
            };
        }

    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);
    })
    return (
        <>
            <section>
                <div class="pages">
                    <span className="prev"></span>
                    {pages.map(p => (
                        <span key={p}>
                            <NavLink style={isAvtive}
                                to={`page/${p}`}>{p} </NavLink>
                        </span>
                    ))}
                    <span className="next"></span>
                </div>
                <Outlet context={{ limit, remain, pagesLen }} />
            </section>
        </>
    )
}