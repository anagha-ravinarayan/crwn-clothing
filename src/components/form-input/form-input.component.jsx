import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherFormInputProps }) => {
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherFormInputProps} />
            {
                label &&
                (<label
                    className={`${otherFormInputProps.value.length > 0 ? "shrink" : ''} form-input-label`}>
                    {label}
                </label>)
            }
        </div>
    )
}
export default FormInput;