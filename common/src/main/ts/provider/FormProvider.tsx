import * as React from "react";
import {Formik, FormikProps, FormikErrors} from "formik";
import {Card, CardHeader, CardContent, CardActionArea, Stack, Button} from "@mui/material";
import {useLocal} from "@common/provider/LocalProvider";
import BaseModel from "@common/model/BaseModel";
import {Validator} from "@common/util/Validator";

interface FormContextProps {
}

const FormContext = React.createContext<FormContextProps>({});

interface FormProviderProps<MODEL extends BaseModel<any>> {
    title: string;
    icon: React.ReactNode;
    initialValues: MODEL;
    render(props: FormikProps<any>): React.ReactNode;
}

export const FormProvider = ({title, icon, initialValues ,render}: FormProviderProps<any>) => {
    const local = useLocal();
    const value = React.useMemo(
        () => ({}),
        []
    );
    const validator = (values: any): void | object | Promise<FormikErrors<any>> => {

    }
    return (<FormContext.Provider value={value}>
        <Formik initialValues={initialValues} validate={validator} onSubmit={(values, {setSubmitting}) => {
        }}>
            {(props: FormikProps<any>) => <Card variant="outlined">
                <CardHeader title={title} avatar={icon}/>
                <CardContent>
                    {render(props)}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" type="submit">{local.getBaseMessage('submit')}</Button>
                    </Stack>
                </CardContent>
            </Card>}
        </Formik>
    </FormContext.Provider>)
}