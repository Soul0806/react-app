import { useEffect, useState, useContext, useInsertionEffect } from 'react';
// import { useLocation, useNavigate, useMatch } from 'react-router-dom';

// import { ajax_post, ajax_put, lowerize } from '../lib/helper';

// import { AppContext } from "./Table";

// const API_URL = 'https://localhost:7123/api/merchandise';


function Popup() {
    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    const [selling, setSelling] = useState({
        place: '',
    });

    useEffect(() => {

    }, [])

    function handleChange() {
        setSelling(prev => {
            return {
                ...prev,

            }
        })
    }

    function handleSubmit() {
        return false;
    }
    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">詳細銷售</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method="post" onSubmit={() => handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3 place">
                                <div>
                                    <label htmlFor="store">
                                        <input type="radio" id="store" name="place" value="store" />
                                        店內</label>
                                </div>
                                <div>
                                    <label htmlFor="out-service">
                                        <input type="radio" id="out-service" name="place" value="out-service" />
                                        外出
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="" value="" onChange={() => handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="" value="" onChange={() => handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="" value="" onChange={() => handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="" value="" onChange={() => handleChange} />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit"
                                    className="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Popup;