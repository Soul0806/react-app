import { useState } from 'react';

import { useOutletContext, useParams, useLoaderData } from 'react-router-dom';
import Popup from "./popup";
const API_URL = 'https://localhost:7123/api/product';
const PAGE_ACTION = `${API_URL}/page/`;

function pageAction(page) {
    let result;
    result = fetch(`${PAGE_ACTION}${page}`)
        .then(res => { return res.json() })
        .then(data => {
            return data;
        })
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

    let products;
    let page = params.pageN
    if (page != null) {
        products = await pageAction(page);
    } else {
        page = 1;
        products = await pageAction(page);
    }
    return { products };
}

export default function Table() {

    const { products } = useLoaderData();

    const [showModal, setShowModal] = useState(false);

    const [p, setP] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setP((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ttile</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(p => (
                            <tr key={p.ID}>
                                <td className="id">{p.ID}</td>
                                <td className="title">{p.Title}</td>
                                <td className="price">{p.Price}</td>
                                <td className="brand">{p.Brand}</td>
                                <td className="category">{p.Category}</td>
                                <td>
                                    <span class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setP(p)}>edit</span>
                                    <span class="material-symbols-outlined" onClick={() => handleDelete(p.ID)}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Popup showModal={showModal} setShowModal={setShowModal} p={p} setP={setP} />
        </>
    )
}