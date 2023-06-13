import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [k , setK] = useState("");
 
    function handleRoute(e) {
        const path = e.target.value;
        navigate(path);
    }

    // useEffect(() => {
    //     console.log(k);
    // }, [k])
    const handleKey = (e) => {
        setK(e.target.value);
    }

    return (
        <>
            <div id="container">
                <header>
                    <div class="header">
                        <h1 class="title"><Link to="/">Product</Link></h1>
                        <h5 class="manage"><Link to="/backend">後台管理</Link></h5>
                    </div>
                </header>
                <main>
                    <aside>
                        <div className="">
                            <label>操作</label>
                            <select onChange={(e) => handleRoute(e)}>
                                <option value="">-----</option>
                                <option value="merchandise">產品</option>
                                <option value="">訂單</option>
                            </select>
                        </div>

                        <div className="keyword">
                            <label>關鍵字</label>
                            <input type="text" name="keyword" onChange={(e) => handleKey(e)}/>
                        </div>

                        <div className="brand">
                            <input type="checkbox" />
                            <label htmlFor="">品牌</label>
                            <select>
                                <option value="">-----</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="category">
                            <input type="checkbox" />
                            <label htmlFor="">類型</label>
                            <select>
                                <option value="">-----</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="price">
                            <input type="checkbox" />
                            <label htmlFor="">價格</label>
                            <input type="text" />
                        </div>
                    </aside>
                    <Outlet context={{ k }}/>
                </main>
            </div>
        </>
    );
}