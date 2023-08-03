function FormRadio(props) {
    const { label, ...inputs } = props;
    return (
        <>
            <label htmlFor={props.id}>{label}
                <input {...inputs}
                />
            </label>
        </>
    )
}

export default FormRadio