import { useState } from 'react';
import { useOutletContext, useParams, useLoaderData, NavLink, Outlet } from 'react-router-dom';


const API_URL = 'https://localhost:7123/api/product';

function Get(id = null) {
    let result;

    if (id != null) {
        result = fetch(`${API_URL}/${id}`)
            .then(res => { return res.json() })
            .then(data => {
                return data[0];
            });
    } else {
        result = fetch(API_URL)
            .then(res => { return res.json() })
            .then(data => {
                return data;
            })
    }
    return result;
}


const handleDelete = (pId) => {
    let data = { ID: pId };
    fetch(`${API_URL}/${pId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(res => { return res.json })
        .then(data => window.location.replace('/'));
}


export async function loader({ params }) {

    const allProducts = await Get(); 
    const pages = [...Array(Math.ceil(Object.keys(allProducts).length / 15)).keys()];

    return { pages };
}

export default function Table() {

    const { products, pages } = useLoaderData();
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setP((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

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
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isActive ? "red" : "black",
                                            cursor: isActive ? "text" : ""
                                        };
                                    }}
                                        to={`page/${p + 1}`}>{p + 1}</NavLink>
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