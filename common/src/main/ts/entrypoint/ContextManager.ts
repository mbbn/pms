import {createTheme} from "@mui/material";
import getDefaultTheme from "@common/getDefaultTheme";

function getTheme(theme: any) {
    return createTheme(getDefaultTheme(theme));
}
export default function getContext(theme: any) {
    return {
        theme: getTheme(theme)
    }
}