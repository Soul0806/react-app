import { useState, useEffect, useParams } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Outlet, Link, useLoaderData, Form, json, useNavigation, NavLink } from "react-router-dom";
import Popup from "./popup";


// import { getContacts, createContact  } from "../contacts";
// import Contact from "./contact";

const API_URL = 'https://localhost:7123/api/product';
const WRITE_ACTION = 'https://localhost:7123/write';
const PAGE_ACTION = 'https://localhost:7123/?page=';

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

function pageAction(page) {
    let result;
    result = fetch(`${PAGE_ACTION}${page}`)
        .then(res => { return res.json() })
        .then(data => {
            return data;
        })
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

export async function loader({ params }) {
    let products 
    const allProducts = await Get(); 
    const page = params.pageN
    if(page != null) {
        products = await pageAction(page);
    }
    else {
        products = allProducts
    }
    const pages = [...Array(Math.ceil(Object.keys(allProducts).length / 10)).keys()];;
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
                                    <span key={p}>
                                        <NavLink style={({ isActive, isPending }) => {
                                            return {
                                                fontWeight: isActive ? "bold" : "",
                                                color: isActive ? "red" : "black",
                                            };
                                        }}
                                            to={`page/${p + 1}`}>{p + 1}</NavLink>
                                    </span>
                                ))}
                                <span>&gt;</span>
                            </div>
                            <Outlet context={[products]} />
                        </>
                    )}
            </div>
            <Popup showModal={showModal} setShowModal={setShowModal} p={p} setP={setP} />
        </div>
    );
}