import {useState, useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {useLocal} from "@common/provider/LocalProvider";
import {TextField} from "@common/component/TextField";
import CompanyModel from "@common/model/CompanyModel";
import CompanyService from "@common/service/CompanyService";
import {FormProvider} from "@common/provider/FormProvider";

export const SettingsView = () => {
    const [company, setCompany] = useState<CompanyModel>();
    useEffect(() => {
        const companyService = new CompanyService();
        companyService.currentCompany().then(company => {
            setCompany(company);
        });
    }, []);
    if(!company)
        return null;

    const local = useLocal();

    return (
        <FormProvider title={local.getBaseMessage('settings')} icon={<Settings color="info"/>} initialValues={company}
                      render={({handleChange, handleBlur, values}) =>
                          <>
                              <Grid container spacing={2}>
                                  <Grid item md={4} xs={12}>
                                      <TextField label={local.getMessage(CompanyModel.MODEL, CompanyModel.HOST_NAME)}
                                                 name={CompanyModel.HOST_NAME} onChange={handleChange} onBlur={handleBlur}
                                                 value={values[CompanyModel.HOST_NAME]}/>
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                      <TextField label={local.getMessage(CompanyModel.MODEL, CompanyModel.LATIN_NAME)}
                                                 name={CompanyModel.LATIN_NAME} onChange={handleChange} onBlur={handleBlur}
                                                 value={values[CompanyModel.LATIN_NAME]}/>
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                      <TextField label={local.getMessage(CompanyModel.MODEL, CompanyModel.PERSIAN_NAME)}
                                                 name={CompanyModel.PERSIAN_NAME} onChange={handleChange} onBlur={handleBlur}
                                                 value={values[CompanyModel.PERSIAN_NAME]}/>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <TextField label={local.getMessage(CompanyModel.MODEL, CompanyModel.ABOUT)}
                                                 name={CompanyModel.ABOUT} onChange={handleChange} onBlur={handleBlur}
                                                 value={values[CompanyModel.ABOUT]} multiline rows={3} fullWidth/>
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