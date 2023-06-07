import { useState, useEffect, useParams } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Outlet, Link, useLoaderData, Form, json, useNavigation, NavLink, useOutlet } from "react-router-dom";
import Table from './Table';
import Page from './Page';


// import { getContacts, createContact  } from "../contacts";
// import Contact from "./contact";

const API_URL = 'https://localhost:7123/api/product';
const WRITE_ACTION = 'https://localhost:7123/write';
const PAGE_ACTION = `${API_URL}/page/`;


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
    return {};
}

export async function action({ request }) {

    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const products = await write(formData.rebuild);

    return { products }
}

export default function Product() {

    const pages = [1, 2, 3, 4];
    const { products } = useLoaderData();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div id="container">
            <header>
                <div class="header">
                    <h1 class="title"><Link to="/">Product</Link></h1>
                    <h5 class="manage"><Link to="/backend">後台管理</Link></h5>
                </div>
            </header>
            <div className="detail">
                <Table />
            </div>
        </div>
    );
}