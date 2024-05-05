import React, {useState} from "react";
import Button from "@mui/material/Button";
import {red} from "@mui/material/colors";
import {useLocal} from "@common/provider/LocalProvider";
import {useFormikContext} from "formik";
interface UploadImageProps {
    name: string;
    label: string;
    helperText?: string;
}
export const UploadImage = ({name, label, helperText}: UploadImageProps) => {
    const local = useLocal();
    const [imageBase64, setImageBase64] = useState<string | null>();
    const {values, errors} = useFormikContext<any>();

    return <div>
        <img src={imageBase64 ? imageBase64 : './img/unknownImage.png'} style={{width: '100%', borderStyle: 'solid', borderWidth: 1}}/>
        <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" fullWidth>
                {label ? label : local.getBaseMessage('selectImage')}
                <input
                    style={{display: 'none'}}
                    accept="image/*"
                    id="contained-button-file"
                    type="file" multiple
                    onChange={event => {
                        const reader = new FileReader();

                        var file = event.target.files ? event.target.files[0] : undefined;
                        if (file instanceof File) {
                            reader.readAsDataURL(file);
                            reader.onloadend = function () {
                                if(typeof reader.result==='string'){
                                    values[name] = String(reader.result);
                                    setImageBase64(String(reader.result));
                                }
                            }.bind(event.target);
                        }
                        event.preventDefault();
                    }}
                />
            </Button>
            <div style={{color: red['500']}}>{errors[name] === undefined ? helperText : String(errors[name])}</div>
        </label>
    </div>
}