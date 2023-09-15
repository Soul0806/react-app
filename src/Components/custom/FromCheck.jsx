import { capitalize } from "lodash";

const FormCheck = ({ label, ...props }) => {
    return (
        <>
            <label htmlFor={label}>{capitalize(label)}
            </label>
            <input type="checkbox" {...props} />
        </>
    );
}

export default FormCheck; 