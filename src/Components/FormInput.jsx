import React from 'react'

function FormInput(props) {
  const { label, ...input} = props;
  return (
    <label htmlFor={input.id}>{label}
    <input {...input}/>
    </label>
  )
}

export default FormInput