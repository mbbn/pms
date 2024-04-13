import {TextFieldProps as MuiTextFieldProps, FormControl, InputLabel, OutlinedInput , FormHelperText } from "@mui/material";
import * as React from "react";

export const TextField = ({onChange, onBlur, label, name, value, multiline, rows, helperText}: MuiTextFieldProps) => {
    return <FormControl variant="outlined" fullWidth margin="dense" size="small">
        <InputLabel htmlFor="my-input">{label}</InputLabel>
        <OutlinedInput id="my-input" label={label} multiline={multiline} rows={rows} name={name} value={value} onChange={onChange} onBlur={onBlur} aria-describedby="my-helper-text"/>
        <FormHelperText id="my-helper-text">{helperText}</FormHelperText>
    </FormControl>
}