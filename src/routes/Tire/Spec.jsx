import React, { useContext, useState, useImperativeHandle, useRef } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

import { AppContext } from './Tire';
import { combineTire } from './useTire';
import Note from './Note';

// window.onload = () => {
//     const btn = document.querySelector('.increase');
//     console.log(btn);
// }


function Spec() {
    const noteRef = useRef([]);
    const param = useParams();
    const { specs, inches, setInches, dispatch } = useContext(AppContext);
    const [target, setTarget] = useState('');
    const { ref } = useOutletContext();

    useImperativeHandle(ref, () => {
        return {
            cancelTarget: () => setTarget(''),
            cleanNoteRef: () => noteRef.current = [],
            cleanNote:    () => cleanNote()
        }
    })

    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    function fadeIn(el) {
        el.style.animation = 'fade-in 1s linear';
    }

    function cleanNote() {
        const note = document.querySelector('.note');
        note.replaceChildren();
    }

    function note(s) {
        const note = document.querySelector('.note');
        let div = document.createElement("div");
        div.className = 'noti';
        div.appendChild(document.createTextNode(s));
        noteRef.current.push(div);

        if (noteRef.current.length > 4) {
            noteRef.current.shift();
            note.removeChild(note.firstElementChild);
        }

        if (noteRef.current.length == 1) {
            note.appendChild(div);
            // fadeIn(noteRef.current[noteRef.current.length - 1])
        } else {
            let index = 0;
            let lastIndex = noteRef.current.length - 1;
            let offset = -20;
            while (index < lastIndex) {
                noteRef.current[index].style.top = getOffset(noteRef.current[index]).top + (offset) + "px";
                index++;
            }
            note.appendChild(div);

        }
    }

    function onclick(s, action) {
        return () => {
            const inch = s.slice(-2);
            const num = inches[inch]['spec'][s];
            if (action == 'add') {
                // dispatch({type: ACTION.INCREASE, payload: { inch: inch, s: s, num: num }})
                // setNote(prev => {
                //     return [ ...prev, { name: s }]
                // })
                note(s);
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num + 1 } } }
                })

            } else {
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num - 1 } } }
                })
            }
            setTarget(s);
        }
    }

    function active(s) {
        return {
            color: s == target ? 'red' : 'black'
        }
    }

    return (
        <>
            <div className="spec-wrapper">
                {specs.map((spec, idx) => {
                    const num = inches[spec.slice(-2)]['spec'][spec];
                    const btnStyle = (num == 0) ? { opacity: 0.7, cursor: 'not-allowed' } : { opacity: 1 };
                    const disabled = (num == 0) ? true : false;
                    return <div className="item" key={idx}>
                        <div className="spec">{spec}</div>
                        <div className="num" style={active(spec)}>{num}</div>
                        <button className="button minor" style={btnStyle} disabled={disabled} onClick={onclick(spec, 'minor')}> - </button>
                        <button className="button increase" onClick={onclick(spec, 'add')}> + </button>
                    </div>
                }
                )}
            </div>
            <Note />
        </>
    )
}

export default React.forwardRef(Spec)