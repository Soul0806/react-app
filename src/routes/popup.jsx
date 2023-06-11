import { useLocation  } from 'react-router-dom';
import { ajax_post, ajax_put } from '../lib/libs';

const API_URL = 'https://localhost:7123/api/product';

function Popup({ p, setP }) {
    const location = useLocation();
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setP((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data, url;
        if (p.id == null) {
            data = { Title: p.title, Price: p.price, Brand: p.brand, Category: p.category, Thumbnail: p.thumbnail };
            ajax_post(API_URL, data, location.pathname);
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
                        <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div>
                                <label>編號 : <span>{p?.ID}</span> </label>
                               
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="title" defaultValue={p?.title} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="price" defaultValue={p?.price} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="brand" defaultValue={p?.brand} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="category" defaultValue={p?.category} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="thumbnail" defaultValue={p?.thumbnail} onChange={handleInputChange} />
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