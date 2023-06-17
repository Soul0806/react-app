
import { useContext, useEffect, useState, createContext } from 'react';
import { useLoaderData, useLocation, useOutletContext, useParams } from "react-router-dom";
import Popup from "./Popup";
import { ajax_get, ajax_del } from '../lib/libs';
import _ from 'lodash'

const API_URL = 'https://localhost:7123/api/merchandise';
const PAGE_ACTION = `${API_URL}/page/`;
const limit = 15;

export async function loader({ params }) {
    const page = params.pageN || 1;
    const url = `${PAGE_ACTION}${page}`;
    const merchan = await ajax_get(url);
    const merchanLength = Object.keys(merchan).length;
    const lastOne = (merchanLength == 1) ? true : false;
    return { merchan, page, lastOne }
}

export default function Page() {

    const [all, setAll] = useState([]);
    const [display, setDisplay] = useState([]);

    const { merchan, page, lastOne } = useLoaderData();
    const [p, setP] = useState();
    const ctxt = useOutletContext();
    const param = useParams();
    const location = useLocation();

    useEffect(() => {
        if (all.length != 0) {
            const page = param.pageN;
            const skip = (page - 1) * limit;
            setDisplay(all.slice(skip, skip + limit));
        } else {
            const fetchData = async () => {
                const data = await ajax_get(API_URL);
                setAll(data);                
            }
            fetchData();
        }
    }, [location])

    useEffect(() => {
        setDisplay(all.slice(0, 15));
    }, [all])

    const handleDelete = (pId, lastone) => {
        let path;
        const url = `${API_URL}/${pId}`;
        if (page > 1) {
            path = lastOne == true ? `/merchandise/page/${page - 1}` : location.pathname;
        }
        ajax_del(url, path);
        setAll((prev) => {
            return prev.filter(item => item.id !== pId);
        })
    }

    const mIndex = (idx) => {
        return (page - 1) * ctxt.limit + idx + 1;
    }

    return (
        <>
            <div className="add">
                <button type="button" className="btn btn-sm btn-secondary">
                    <span className="material-symbols-outlined md-18" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setP({})}>新增</span>
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
                        display.map((m, idx) => (
                            <tr key={m.id}>
                                <td className="id left_round">{mIndex(idx)}</td>
                                <td className="title">{m.title}</td>
                                <td className="price">{m.price}</td>
                                <td className="brand">{m.brand}</td>
                                <td className="category right_round">{m.category}</td>
                                <td>
                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setP(m)}>edit</span>
                                    <span className="material-symbols-outlined" onClick={() => handleDelete(m.id, lastOne)}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Popup p={p} setP={setP} {...ctxt} />
        </>
    )
}

