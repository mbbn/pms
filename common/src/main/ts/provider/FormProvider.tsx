import * as React from "react";
import {Formik, FormikProps, FormikErrors} from "formik";
import {Card, CardHeader, CardContent, CardActionArea, Stack, Button} from "@mui/material";
import {useLocal} from "@common/provider/LocalProvider";
import BaseModel from "@common/model/BaseModel";

export type Validator<MODEL> = {
    values: MODEL;
    errors: FormikErrors<MODEL>;
    notEmpty(propertyName: string, propertyTitle: string): void;
};

interface FormProviderProps<MODEL extends BaseModel<any>> {
    title: string;
    icon: React.ReactNode;
    initialValues: MODEL;

    render(props: FormikProps<MODEL>): React.ReactNode;

    validate?(validator: Validator<MODEL>): void;
    submit?(values: MODEL): void;
}

export const FormProvider = ({title, icon, initialValues, validate, submit, render}: FormProviderProps<any>) => {
    const local = useLocal();
    const validation = (values: any): void | object | Promise<FormikErrors<any>> => {
        if (validate) {
            const errors = {};
            const validator: Validator<any> = {
                values,
                errors,
                notEmpty(propertyName: string, propertyTitle: string) {
                    if (!values.hasOwnProperty(propertyName) || values[propertyName].trim().length === 0) {
                        // @ts-ignore
                        errors[propertyName] = local.getCommonMessage('error.empty', {0: propertyTitle});
                    }
                }
            };
            validate(validator);
            return validator.errors;
        }
    }
    return (<Formik initialValues={initialValues} validate={validation} onSubmit={(values, {setSubmitting}) => {
        submit ? submit(values) : null
    }}>
        {(props: FormikProps<any>) =>
            <form onSubmit={props.handleSubmit}>
                <Card variant="outlined">
                    <CardHeader title={title} avatar={icon}/>
                    <CardContent>
                        {render(props)}
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="contained" type="submit">{local.getBaseMessage('submit')}</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </form>}
    </Formik>)
}