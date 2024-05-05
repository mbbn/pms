import {useState, useEffect} from "react";
import {Grid} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {useLocal} from "@common/provider/LocalProvider";
import {TextField} from "@common/component/TextField";
import {FormProvider, Validator} from "@common/provider/FormProvider";
import {useApp} from "@common/entrypoint/BaseEntryPoint";
import CategoryModel from "../model/CategoryModel";
import CategoryService from "../service/CategoryService";
import {UploadImage} from "@common/component/UploadImage";

export const CategoryView = () => {
    const [category, setCategory] = useState<CategoryModel>(new CategoryModel());
    const app = useApp();
    const local = useLocal();
    const categoryService = CategoryService.INSTANCE;
    const validate = function (validator: Validator<CategoryModel>) {
        validator.notEmpty(CategoryModel.LATIN_NAME, local.getMessage(CategoryModel, CategoryModel.LATIN_NAME));
        validator.notEmpty(CategoryModel.PERSIAN_NAME, local.getMessage(CategoryModel, CategoryModel.PERSIAN_NAME));
        validator.notEmpty(CategoryModel.IMAGE, local.getMessage(CategoryModel, CategoryModel.IMAGE));
    }
    return (
        <FormProvider title={local.getBaseMessage('settings')} icon={<Settings color="info"/>} initialValues={category}
                      validate={validate} submit={values => {
            app.openWaiting();
            categoryService.update(values).then(value => {
                setCategory(value);
                app.closeWaiting();
            });
        }} render={({values}) =>
            <>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <TextField label={local.getMessage(CategoryModel, CategoryModel.LATIN_NAME)}
                                   name={CategoryModel.LATIN_NAME}/>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField label={local.getMessage(CategoryModel, CategoryModel.PERSIAN_NAME)}
                                   name={CategoryModel.PERSIAN_NAME}/>
                    </Grid>
                    <Grid item md={4} xs={12}/>
                    <Grid item md={4} xs={12}>
                        <UploadImage label={local.getMessage(CategoryModel, CategoryModel.IMAGE)} name={CategoryModel.IMAGE}/>
                    </Grid>
                </Grid>
            </>}/>);
}