import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <nav className="nav">
                    {/* <li>
                        <NavLink to="merchandise/page/1">產品</NavLink>
                    </li> */}
                    <NavLink className="header__home" to="/">Product</NavLink>
                    <NavLink className="header__app" to="tire/upstair/spec/12">庫存管理</NavLink>
                    <NavLink className="header__app" to="record">銷售</NavLink>
                    <NavLink className="header__app" to="todo">代辦清單</NavLink>
                    <NavLink className="header__app" to="csv">CSV</NavLink>
                    <NavLink className="header__backend" to="backend">後台管理</NavLink>
                </nav>
            </div>
        </header>
    )
}