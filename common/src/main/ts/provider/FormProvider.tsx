import * as React from "react";
import {Formik, FormikProps} from "formik";
import {Card, CardHeader, CardContent, CardActionArea, Stack, Button } from "@mui/material";
import {useLocal} from "@common/provider/LocalProvider";

interface FormContextProps{

}
const FormContext = React.createContext<FormContextProps>({
});
interface FormProviderProps{
    title: string;
    icon: React.ReactNode;
    initialValues: any;
    render(props: FormikProps<any>): React.ReactNode;
}
export const FormProvider = ({title, icon, initialValues, render}: FormProviderProps) => {
    const local = useLocal();
    const value = React.useMemo(
        () => ({
        }),
        []
    );
    return (<FormContext.Provider value={value}>
        <Formik initialValues={initialValues} validate={values => {
        }} onSubmit={(values, {setSubmitting}) => {
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