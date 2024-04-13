import {ReactNode} from "react";
import {Card, CardHeader, CardContent, Avatar} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {useLocal} from "@common/provider/LocalProvider";

export const SettingsView = () => {
    const local = useLocal();
    return (<Card variant="outlined">
        <CardHeader title={local.getBaseMessage('settings')} avatar={<Avatar><Settings color="primary"/></Avatar>}/>
    </Card>);
}