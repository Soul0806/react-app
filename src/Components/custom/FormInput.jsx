function FormInput(props) {
    const { label, id, value, ...inputs } = props;
    return (
        <label htmlFor={id}>{label}
            <input {...inputs}
            />
        </label>
    )
}

export default FormInput