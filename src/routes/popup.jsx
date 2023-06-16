import { useLocation  } from 'react-router-dom';
import { ajax_post, ajax_put } from '../lib/libs';
import { createRef, useEffect, useState } from 'react';

const API_URL = 'https://localhost:7123/api/merchandise';

function Popup({  p, setP,  remain, pagesLen }) {
    
    const location = useLocation();
    const [modify, setModify] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setP((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        modify[name] = value;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data, url, path;
        if (p.id == null) {
            data = { Title: p.title, Price: p.price, Brand: p.brand, Category: p.category, Thumbnail: p.thumbnail };
            path = remain == 0 ? `/merchandise/page/${pagesLen + 1}`: location.pathname;
            ajax_post(API_URL, data, path);
        } else {
            data = { ID: p.id, Title: p.title, Price: p.price, Brand: p.brand, Category: p.category, Thumbnail: p.thumbnail };
            ajax_put(API_URL, data, location.pathname);
        }
    }

    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{p?.id ? "編輯" : "新增"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form key={p?.id} method="post" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {p?.id ? 
                            (<div className="mb-3">
                                <h5>編號 : <span>{p?.id}</span></h5>
                            </div>) : "" }
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="title" value={p?.title} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="price" value={p?.price} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="brand" value={p?.brand} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="category" value={p?.category} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="thumbnail" value={p?.thumbnail} onChange={handleInputChange} />
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