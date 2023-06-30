import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from './Tire';


function Note() {

    const { note } = useContext(AppContext);
    let el = [];
    window.onload = () => {
        const div = document.querySelector(".note");
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((record) => {
                // console.log(record);
            });
        });

        observer.observe(div, {
            childList: true,
            attributes: true,
            characterData: true,
        });
    }

    return (
        <div className="note-wrapper">
            <div className="note">
                {/* {note.current.map(n => {
                    const myArray = new Uint32Array(1);
                    const id = crypto.getRandomValues(myArray)[0];

                    return <div key={`${n.name}-${id}`} className={`note-${n.name}`}>{n.name}</div>;
                })} */}
            </div>
        </div>

    )
}

export default Note