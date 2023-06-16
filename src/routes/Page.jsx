
import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from "react-router-dom";
import Popup from "./Popup";
import { ajax_get, ajax_del } from '../lib/libs';

const API_URL = 'https://localhost:7123/api/merchandise';
const PAGE_ACTION = `${API_URL}/page/`;


export async function loader({ params }) {

    const page = params.pageN || 1;
    const url = `${PAGE_ACTION}${page}`;
    const merchan = await ajax_get(url);
    const merchanLength = Object.keys(merchan).length; 
    const lastOne = (merchanLength == 1 ) ? true : false;
    return { merchan, page, lastOne }
}

export default function Page() {

    const { merchan, page, lastOne } = useLoaderData();
    const [p, setP] = useState();
    const ctxt = useOutletContext();

    const handleDelete = (pId, lastone) => {
        let path;
        const url = `${API_URL}/${pId}`;
        if(page > 1) {
            path = lastOne == true ? `/merchandise/page/${page - 1}`: location.pathname;
        }
        ajax_del(url, path);
    }

    const mIndex = (idx) => {
        return (page - 1) * ctxt.limit + idx + 1;
    }

    return (
        <>
            <div className="add">
                <button type="button" class="btn btn-sm btn-secondary">
                    <span class="material-symbols-outlined md-18" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setP({})}>新增</span>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        merchan.map((m, idx) => (
                            <tr key={m.id}>
                                <td className="id left_round">{mIndex(idx)}</td>
                                <td className="title">{m.title}</td>
                                <td className="price">{m.price}</td>
                                <td className="brand">{m.brand}</td>
                                <td className="category right_round">{m.category}</td>
                                <td>
                                    <span class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setP(m)}>edit</span>
                                    <span class="material-symbols-outlined" onClick={() => handleDelete(m.id, lastOne)}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Popup p={p} setP={setP} { ...ctxt }/>
        </>
    )
}

