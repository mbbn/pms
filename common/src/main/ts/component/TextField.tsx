import {TextFieldProps as MuiTextFieldProps, FormControl, InputLabel, OutlinedInput , FormHelperText } from "@mui/material";
import * as React from "react";
import {useFormikContext} from "formik";

type TextFieldProps = MuiTextFieldProps & {
    name: string;
}

export const TextField = ({label, name, multiline, rows, helperText}: TextFieldProps) => {
    const {values, handleChange, handleBlur, errors} = useFormikContext<any>();
    const value = values[name];
    return <FormControl variant="outlined" fullWidth margin="dense" size="small">
        <InputLabel htmlFor="my-input">{label}</InputLabel>
        <OutlinedInput id="my-input" label={label} multiline={multiline} rows={rows} name={name} value={value} onChange={handleChange} onBlur={handleBlur} aria-describedby="my-helper-text" error={errors[name] !== undefined}/>
        <FormHelperText id="my-helper-text" error={errors[name] !== undefined}>{errors[name] === undefined ? helperText : String(errors[name])}</FormHelperText>
    </FormControl>
}