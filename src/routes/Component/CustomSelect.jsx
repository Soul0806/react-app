import React from 'react'

function CustomSelect({ name, option }) {
    console.log(option);
    return (
        <div>
            <select name={name} id="">
                {option.map((op, idx) => (
                    <option key={idx} value={op} >{op}</option>
                )
                )}
            </select>
        </div>
    )
}

export default CustomSelect