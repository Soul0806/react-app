import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Outlet, Link, useLoaderData, Form, json, useNavigation, NavLink } from "react-router-dom";
import Popup from "./popup";


// import { getContacts, createContact  } from "../contacts";
// import Contact from "./contact";
const API_URL = 'https://localhost:7123/api/product';
const WRITE_ACTION = 'https://localhost:7123/write';

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

const Delete = (pId) => {
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
// async function Put(id) {
//   let dep = await fetch(`${api_url}/${id}`)
//     .then(res => { return res.json() })
//     .then(data => {
//       return data[0];
//     })

//   return p;
// }

async function write(rebuild) {
    let result = fetch(`${WRITE_ACTION}/${rebuild}`)
        .then(res => { return res })
    return result;
}

export async function loader() {

    const products = await Get();
    const pages = [...Array(Math.ceil(Object.keys(products).length / 10)).keys()];;
    return { products, pages };
}

export async function action({ request }) {

    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const products = await write(formData.rebuild);
    return { products }
}

export default function Product() {

    const { products, pages } = useLoaderData();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [p, setP] = useState({
        Title: '',
        Price: '',
        Brand: '',
        Category: '',
        Thumbnail: '',
    });

    var handleModalOpen = (pId = null) => {
        setShowModal(true);
        if (pId != null) {
            Get(pId).then(res => {
                setP(res);
            });
        } else {
            setP('');
        }
    }

    var handleDelete = (pId) => {
        Delete(pId);
    }

    return (
        <div id="container">
            <aside>
                <h1>Product</h1>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => handleModalOpen(null)}
                >新增</button>
                <div>
                    <Form method="post">
                        <select name="rebuild">
                            <option value=""> --------</option>
                            <option value="30"> 重建30筆</option>
                            <option value="50"> 重建50筆</option>
                            <option value="100">重建100筆</option>
                        </select>
                        <select name="mode">
                            <option value="fix"> 固定</option>
                            <option value="fix"> 隨機</option>
                        </select>
                        <button className="" value="submit">確定</button>
                    </Form>
                </div>
            </aside>
            <div className="detail">
                {navigation.state === "submitting" ?
                    (<div><img src="/img/Loading_icon.gif" alt="Loading_icon" /></div>) : (
                        <>
                            <div class="pages">
                                <span>&lt;</span>
                                {pages.map(p => (
                                    <span>
                                        <NavLink>{p + 1}</NavLink>
                                    </span>
                                ))}
                                <span>&gt;</span>
                                </div>
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
                                                        onClick={() => handleModalOpen(p.ID)}>edit</span>
                                                    <span class="material-symbols-outlined" onClick={() => handleDelete(p.ID)}>
                                                        delete
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>

                    )}
            </div>
            <Popup showModal={showModal} setShowModal={setShowModal} p={p} setP={setP} />
        </div>
    );
}