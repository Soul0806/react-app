import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./Table";

function Paging() {
    const {pages} = useContext(AppContext);
    const [home, setHome] = useState(null);
    const isAvtive =
        ({ isActive, isPending }) => {
            if (home && p == 1) {
                isActive = true;
            }
            return {
                fontWeight: isActive ? "bold" : "bold",
                color: isActive ? "red" : "black",
                cursor: isActive ? "text" : ""
            };
        }
        
    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);

    })

    return (
        <div className="pages">
            <span className="prev"></span>
            {pages.map(p => (
                <span key={p}>
                    <NavLink style={isAvtive}
                        to={`page/${p}`}>{p} </NavLink>
                </span>
            ))}
            <span className="next"></span>
        </div>
    )
}

export default Paging;