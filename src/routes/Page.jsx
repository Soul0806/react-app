
import { useState } from 'react';
import { useLoaderData, useOutletContext, useLocation } from "react-router-dom";
import Popup from "./popup";
import { ajax_get, ajax_del } from '../lib/libs';

const API_URL = 'https://localhost:7123/api/merchandise';
const PAGE_ACTION = `${API_URL}/page/`;


export async function loader({ params }) {

    const page = params.pageN || 1;
    const url = `${PAGE_ACTION}${page}`;
    let merchan = await ajax_get(url);
    return { merchan }
}

const handleDelete = (pId) => {
    const url = `${API_URL}/${pId}`;
    ajax_del(url, location.pathname);
}

export default function Page() {

    let { merchan } = useLoaderData();
    const [p, setP] = useState();

    return (
        <>
            <div className="add">
                <button type="button" class="btn btn-sm btn-secondary">
                    <span class="material-symbols-outlined md-18" data-bs-toggle="modal" data-bs-target="#exampleModal">新增</span>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ttile</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        merchan.map(m => (
                            <tr key={m.id}>
                                <td className="id left_round">{m.id}</td>
                                <td className="title">{m.title}</td>
                                <td className="price">{m.price}</td>
                                <td className="brand">{m.brand}</td>
                                <td className="category right_round">{m.category}</td>
                                <td>
                                    <span class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setP(m)}>edit</span>
                                    <span class="material-symbols-outlined" onClick={() => handleDelete(p.id)}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Popup p={p} setP={setP} />
        </>
    )
}

