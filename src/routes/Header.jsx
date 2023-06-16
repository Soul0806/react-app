import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1 class="title"><Link to="/">Product</Link></h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="merchandise">產品</NavLink>
                    </li>
                    <li>
                        <NavLink tp="/">訂單</NavLink>
                    </li>
                </ul>
            </nav>
            <h5 class="manage"><Link to="/backend">後台管理</Link></h5>
        </header>
    )
}