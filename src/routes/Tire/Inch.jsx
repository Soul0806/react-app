import React, { useContext, useState, useEffect, useMemo } from 'react'
import { NavLink, useParams } from 'react-router-dom';

import { AppContext } from './Tire';

function Inch({ onclick }) {
    const [ test, setTest ] = useState(0);
    const param = useParams();
    const { inches } = useContext(AppContext);

    return (
        <div className='inch-wrapper'>
            {Object.keys(inches).map(inch => {
                return <NavLink key={inch} to={`${param.area}/spec/${inch}`} 
                        className={({ isActive }) => isActive ? 'active inch' : 'inactive inch'} 
                        onClick={() => onclick(Object.keys(inches[inch].spec))}>
                    {inch}
                    </NavLink>})
            }
        </div>
    )
}

export default Inch