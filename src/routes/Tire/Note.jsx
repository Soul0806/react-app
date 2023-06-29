import React, { useContext } from 'react'
import { ACTION, AppContext } from './Tire';


function Note() {
    const { note } = useContext(AppContext);
    return (
        <div className="note-wrapper">
            <div className="note">
              
            </div>
        </div>
       
    )
}

export default Note