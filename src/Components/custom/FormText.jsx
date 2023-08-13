function FormText(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <label key={props.id} htmlFor={props.id}>{label}
            <input onChange={onchange} {...inputs}
            />
        </label>
    )
}

export default FormText