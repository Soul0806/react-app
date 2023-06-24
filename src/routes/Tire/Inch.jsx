import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { AppContext } from './Tire';

function Inch({ onclick }) {

    const { inches } = useContext(AppContext);

    return (
        <aside>
            {Object.keys(inches).map(inch => {
                return <NavLink key={inch} to={`spec/${inch}`} 
                        className={({ isActive }) => isActive ? 'active inch' : 'inactive inch'} 
                        onClick={() => onclick(Object.keys(inches[inch].spec))}>
                    {inch}
                    </NavLink>})
            }
        </aside>
    )
}

export default Inch