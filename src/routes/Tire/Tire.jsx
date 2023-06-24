import React, { useEffect, useRef, useState, createContext, useCallback } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

import _ from 'lodash';

import { useTire } from './useTire';
import Inch from './Inch';

export const AppContext = createContext();

export default function Tire() {
  
  const [specs, setSpecs] = useState([])
  const { inches, setInches } = useTire();

  function onclick(specs) {
    setSpecs(specs);
  }
  // console.log(222);
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
