import { useState, useEffect } from 'react';
import { Form, redirect, useLocation  } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const api_url = 'https://localhost:7123/api/product';

async function Put(id) {
    let dep = await fetch(`${api_url}/${id}`)
        .then(res => { return res.json() })
        .then(data => {
            return data[0];
        })
    return p;
}

export async function loader({ params }) {
    return {};
}
export async function action({ request, param }) {
    return {};
}

function Popup({ showModal, setShowModal, p, setP }) {

    const location = useLocation();
    const [modalValue, setModalValue] = useState(null);

    // var handleModalClose = () => {
    //     setShowModal(false);
    // }

    // var handleModalSubmit = () => {
    //     setShowModal(false);
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setP((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data;
        if (p.ID == null) {
            data = { Title: p.Title, Price: p.Price, Brand: p.Brand, Category: p.Category, Thumbnail: p.Thumbnail };
            fetch(`${api_url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
                .then(res => {return res})
                .then(() => window.location.replace(location.pathname));
        } else {
            data = { ID: p.ID, Title: p.Title, Price: p.Price, Brand: p.Brand, Category: p.Category, Thumbnail: p.Thumbnail };
            fetch(`${api_url}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
                .then(res => {return res })
                .then(() => window.location.replace(location.pathname));
        }
    }

    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div>
                                <label>編號 : <span>{p?.ID}</span> </label>
                               
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="Title" defaultValue={p?.Title} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="Price" defaultValue={p?.Price} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="Brand" defaultValue={p?.Brand} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="Category" defaultValue={p?.Category} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="Thumbnail" defaultValue={p?.Thumbnail} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit"
                                className="btn btn-primary">Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Popup;