import React, { useState, createContext, useReducer } from 'react'
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
  const { inches, setInches, areas } = useTire();
  // const [ state, dispatch ] = useReducer(reducer, inches); 

  const [ specs, setSpecs] = useState([]);
  
  // useEffect(() => {
  //   if(!isObjectEmpty(inches)) {
  //     setSpecs(Object.keys(inches?.['12']?.['spec']));
  //   }
  // }, [inches])

  function inchClick(specs) {
    setSpecs(specs);
  }

  return (
    <>
      <div className="tire">
        <AppContext.Provider value={{ specs, inches, setInches, areas }}>
          <Area />
          <Inch onclick={inchClick} />          
          <Outlet />
        </AppContext.Provider>
      </div>
    </>
  )
}
