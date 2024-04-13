import {TextField as MuiTextField, TextFieldProps as MuiTextFieldProps} from "@mui/material";
import * as React from "react";

export const TextField = ({onChange, onBlur, label, name, value, ...otherProps}: MuiTextFieldProps) => {
    return <MuiTextField variant="outlined" size="small" margin="dense" type="text" onChange={onChange} onBlur={onBlur}
                         label={label} name={name} value={value} fullWidth {...otherProps}/>
}