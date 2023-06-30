import React, { useState, createContext, useReducer, useRef, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom';

import _ from 'lodash';

import { useTire } from './useTire';
import Inch from './Inch';
import Area from './Area';



export const AppContext = createContext();

// export const ACTION  = {
//   INCREASE: 'increase',
//   DECREASE: 'decrease',
// }

// const reducer = (state, action) => {
//     switch(action.type) {
//       case ACTION.INCREASE: 
//         const num =  action.payload.num;
//         const inch = action.payload.inch;
//         const spec = action.payload.s;
//         return { ...state, [inch]: { ...state[inch], spec: { ...state[inch]['spec'], [s]: num + 1 } } }
//     }
// }

export default function Tire() {

  const param = useParams();
  const ref = useRef([]);
  const { inches, setInches, areas, combineTire } = useTire();
  // const [ state, dispatch ] = useReducer(reducer, inches); 
  const [specs, setSpecs] = useState([]);

  function inchClick(specs) {
    setSpecs(specs.sort());
  }

  function reset() {
   
    combineTire().then(res => areas.map(area => localStorage.setItem(area.path, JSON.stringify(res))));
    combineTire().then(res => setInches(res));
    ref.current.cleanNote();
    ref.current.cleanNoteRef();
  }

  return (
    <>
      <div className="tire">
        <AppContext.Provider value={{ specs, inches, setInches, areas }}>
          <button className="reset" onClick={reset}>Reset</button>
          <Area />
          <Inch onclick={inchClick} />
          <Outlet context={{ ref }}/>
        </AppContext.Provider>
      </div>
    </>
  )
}
