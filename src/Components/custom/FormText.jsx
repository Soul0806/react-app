function FormText(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <div className="form__group">
            <input onChange={onchange} {...inputs}
            />
            <label key={props.id} htmlFor={props.id}>{label}
            </label>
        </div>
    )
}

export default FormText