import { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import Table from './Table';

const API_URL = 'https://localhost:7123/api/merchandise';
const WRITE_ACTION = 'https://localhost:7123/write';
const PAGE_ACTION = `${API_URL}/page/`;

async function write(rebuild) {
    let result = fetch(`${WRITE_ACTION}/${rebuild}`)
        .then(res => { return res })
    return result;
}


export default function Product() {
    const ctxt = useOutletContext();
    console.log(ctxt);
    return (
        <>
            <section>
                <Table />
            </section>
        </>
    );
}