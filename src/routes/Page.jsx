
import { useState } from 'react';
import { useLoaderData, useOutletContext } from "react-router-dom";
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

export async function loader({ params }) {
    let products;
    let page = params.pageN
    products = await pageAction(page);
    return { products }
}


export default function Page() {

    let { products } = useLoaderData();
    const [p, setP] = useState();
    const [ pages ]  = useOutletContext();

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
        <Popup p={p} setP={setP} />
        </>
    )
}

