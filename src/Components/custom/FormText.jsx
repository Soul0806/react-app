function FormText(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <label htmlFor={props.id}>{label}
            <input onChange={onchange} {...inputs}
            />
        </label>
    )
}

export default FormText