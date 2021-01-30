import React from "react";

import { Group, Input, InputLabel } from "./form-input.styles";

const FormInput = ({ handleChange, label, ...otherFormInputProps }) => {
    return (
        <Group>
            <Input onChange={handleChange} {...otherFormInputProps} />
            {
                label &&
                (<InputLabel value={otherFormInputProps.value}>{label}</InputLabel>)
            }
        </Group>
    )
}
export default FormInput;