import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { ajax_get } from '../lib/libs';

const API_URL = 'https://localhost:7123/api/product';

export async function loader({ params }) {

    const cutPageN = 15
    const allProducts = await ajax_get(API_URL);
    const pages = [...Array(Math.ceil(Object.keys(allProducts).length / cutPageN)).keys()];
    console.log(allProducts);
    return { pages };
}

export default function Table() {
    const [ home, setHome ] = useState(false);

    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);
        
    })
    const { products, pages } = useLoaderData();

    return (
        <>  
            {navigation.state === "submitting" ?
                (<div><img src="/img/Loading_icon.gif" alt="Loading_icon" /></div>) : (
                    <>
                        <div class="pages">   
                            <span>&lt;</span>
                            {pages.map(p => (
                                <span key={p}>
                                    <NavLink style={({ isActive, isPending }) => {
                                        if(home && p == 0 ) {
                                            isActive = true;
                                        }
                                        return {
                                            fontWeight: isActive ? "bold" : "bold",
                                            color: isActive ? "red" : "black",
                                            cursor: isActive  ? "text" : ""
                                        };
                                    }}
                                        to={`page/${p + 1}`}>{p + 1} </NavLink>
                                </span>
                            ))}
                            <span>&gt;</span>
                        </div>
                        <Outlet context={[pages]}/>
                    </>
                )}
        </>
    )
}