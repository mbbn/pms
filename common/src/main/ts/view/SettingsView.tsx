import {useState, useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {useLocal} from "@common/provider/LocalProvider";
import {TextField} from "@common/component/TextField";
import CompanyModel from "@common/model/CompanyModel";
import CompanyService from "@common/service/CompanyService";
import {FormProvider, Validator} from "@common/provider/FormProvider";
import {Label} from "@common/component/Label";
import {useApp} from "@common/entrypoint/BaseEntryPoint";

export const SettingsView = () => {
    const [company, setCompany] = useState<CompanyModel>();
    const app = useApp();
    const local = useLocal();
    const companyService = CompanyService.INSTANCE;
    useEffect(() => {
        companyService.loadCurrentModels().then(company => {
            setCompany(company);
        });
    }, []);
    if (!company)
        return null;
    const validate = function (validator: Validator<CompanyModel>) {
        validator.notEmpty(CompanyModel.LATIN_NAME, local.getMessage(CompanyModel, CompanyModel.LATIN_NAME));
        validator.notEmpty(CompanyModel.PERSIAN_NAME, local.getMessage(CompanyModel, CompanyModel.PERSIAN_NAME));
        validator.notEmpty(CompanyModel.ABOUT, local.getMessage(CompanyModel, CompanyModel.ABOUT));
    }

    return (
        <FormProvider title={local.getBaseMessage('settings')} icon={<Settings color="info"/>} initialValues={company}
                      validate={validate} submit={values => {
            app.openWaiting();
            companyService.update(values).then(value => {
                app.closeWaiting();
                setCompany(value);
            });
        }} render={({values}) =>
                          <>
                              <Grid container spacing={2}>
                                  <Grid item md={4} xs={12}>
                                      <Label label={local.getMessage(CompanyModel, CompanyModel.HOST_NAME)}
                                             value={values[CompanyModel.HOST_NAME]}/>
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                      <TextField label={local.getMessage(CompanyModel, CompanyModel.LATIN_NAME)}
                                                 name={CompanyModel.LATIN_NAME}/>
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                      <TextField label={local.getMessage(CompanyModel, CompanyModel.PERSIAN_NAME)}
                                                 name={CompanyModel.PERSIAN_NAME}/>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <TextField label={local.getMessage(CompanyModel, CompanyModel.ABOUT)}
                                                 name={CompanyModel.ABOUT} multiline rows={3} fullWidth/>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Typography
                                          component="div"
                                          sx={{
                                              alignSelf: 'start',
                                              textAlign: 'start',
                                          }}
                                          dangerouslySetInnerHTML={{__html: values[CompanyModel.ABOUT]}}
                                      />
                                  </Grid>
                              </Grid>
                          </>}/>);
}