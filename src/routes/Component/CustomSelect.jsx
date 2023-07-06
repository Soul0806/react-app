import React from 'react'

function CustomSelect({ option }) {
    console.log(option);
    function handleChange(e) {
        console.log(e.target.value);
    }
    return (
        <div>
            <select name="aaa" id="">
                {option.map((op) => (
                    <option>{op}</option>
                )
                )}
            </select>
        </div>
    )
}

export default CustomSelect