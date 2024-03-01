import * as React from 'react';
import {Formik, FormikErrors, FormikHelpers, FormikValues} from "formik";
import BaseModel from "../../model/BaseModel";
import {ReactElement, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import i18n from "../../i18n/i18n";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export interface FormField {
    type: 'textField'|'password';
    required?: boolean;
    id?: string;
    name: string;
    placeholder?: string;
    label?: string;
    width?: number;
    autoComplete?:string;
}

interface FormProps {
    title: string;
    icon?: ReactElement;
    originModel: BaseModel;
    fields?: FormField[];
    children?: ReactElement | ReactElement[]
}

export default function Form({icon, title, originModel, children,fields}: FormProps) {
    const [model, setModel] = useState(originModel);
    const {t} = i18n;

    const handleSubmit = (values: BaseModel, formikHelpers: FormikHelpers<BaseModel>) => {
        console.log(values, formikHelpers);
    }

    return <Box component={Paper}>
        <AppBar position={"static"} color={"secondary"}>
            <Toolbar disableGutters>
                {icon ? icon:null}
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
        <Box component="main" sx={{
            paddingTop: 3,
            paddingLeft: 1,
            paddingRight: 1
        }}>
            <Formik initialValues={model}
                    onSubmit={handleSubmit}
            validate={values => {
                const errors = {};
                /*fields.forEach(field => {
                    let fieldName = field.name;
                    // @ts-ignore
                    if (field.required && !values[fieldName]) {
                        // @ts-ignore
                        errors[fieldName] = 'Required';
                    }
                })*/
                return errors;
            }}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  })=>(
                      <form onSubmit={handleSubmit}>
                          <Grid container spacing={2}>
                              {!fields ? null : fields.map((field, index) => {
                                  let element = null;

                                  let fieldName = field.name;
                                  // @ts-ignore
                                  let fieldValue = values.hasOwnProperty(fieldName) ? values[fieldName] : undefined;
                                  // @ts-ignore
                                  let hasError = errors[fieldName] && touched[fieldName] && errors[fieldName];
                                  // @ts-ignore
                                  let errorMessage = hasError && errors[fieldName] === 'Required' ? t('form.error.required', {label: field.label}) : '';
                                  let fieldType;
                                  switch (field.type){
                                      case "textField":
                                          fieldType = 'text';
                                          break;
                                      case "password":
                                          fieldType = 'password';
                                          break;
                                  }

                                  element = <TextField key={field.id}
                                                       type={fieldType}
                                                       autoFocus={index === 0}
                                                       error={hasError}
                                                       required={field.required}
                                                       fullWidth
                                                       id={field.id}
                                                       onChange={handleChange}
                                                       onBlur={handleBlur}
                                                       name={fieldName}
                                                       value={fieldValue}
                                                       label={field.label}
                                                       placeholder={field.placeholder}
                                                       helperText={errorMessage}
                                                       autoComplete={field.autoComplete}/>;

                                  return <Grid key={"col_"+index} item xs={12} sm={field.width ? field.width : 12}>
                                      {element}
                                  </Grid>;
                              })}
                          </Grid>
                          {children}
                          <Button
                              key="submit"
                              type="submit"
                              fullWidth
                              disabled={isSubmitting}
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                          >
                              {t('form.submit')}
                          </Button>
                      </form>
                )}
            </Formik>
        </Box>
    </Box>;
}