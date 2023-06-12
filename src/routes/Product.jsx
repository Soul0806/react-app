import { useState } from 'react';
import { Link } from "react-router-dom";
import Table from './Table';

const API_URL = 'https://localhost:7123/api/merchandise';
const WRITE_ACTION = 'https://localhost:7123/write';
const PAGE_ACTION = `${API_URL}/page/`;

async function write(rebuild) {
    let result = fetch(`${WRITE_ACTION}/${rebuild}`)
        .then(res => { return res })
    return result;
}

export async function action({ request }) {

    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const products = await write(formData.rebuild);
    return { products }
}

export default function Product() {

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