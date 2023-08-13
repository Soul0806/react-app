function FormRadio(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <label key={props.id} htmlFor={props.id}>{label}
            <input {...inputs} onChange={onchange} required
            />
        </label>
    )
}

export default FormRadio