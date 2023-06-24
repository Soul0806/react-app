import React, { useEffect, useRef, useState, createContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

import _ from 'lodash';
import { ajax_get, uuid } from '../../lib/helper';
import Inch from './Inch';

import { useTire } from './useTire';

export const AppContext = createContext();

export default function Tire() {
  
  const [specs, setSpecs] = useState([])
  const { inches, setInches } = useTire();

  function onclick(specs) {
    setSpecs(specs);
  }

  return (
    <>
      <div className="tire">
        <AppContext.Provider value={{ inches, setInches }}>
          <Inch onclick={onclick} />          
          <Outlet context={{ specs }} />
        </AppContext.Provider>
      </div>
    </>
  )
}
