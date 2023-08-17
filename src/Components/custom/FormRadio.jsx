function FormRadio(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <label htmlFor={props.id}>{label}
            <input {...inputs} onChange={onchange} required
            />
        </label>
    )
}

export default FormRadio