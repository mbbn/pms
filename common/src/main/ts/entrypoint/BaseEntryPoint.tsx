import * as React from 'react';
import {
    Box,
    Modal
} from "@mui/material";
import "@fontsource/roboto"; // Defaults to weight 400
import "@common/assets/scss/main.scss";
import {Context, useEffect} from "react";
import MenuModel from "@common/model/MenuModel";
import MenuService from "@common/service/MenuService";
import {RouteProvider} from "@common/provider/RouteProvider";
import {LocalProvider} from "@common/provider/LocalProvider";

interface AppContextProps {
    openModal: boolean;
    initialized: boolean;
    menus?: MenuModel[];
}

const AppContext: Context<AppContextProps> = React.createContext<AppContextProps>({
    openModal: true,
    initialized: false
});
interface ScrollProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children?: React.ReactElement;
}

interface AppProps extends ScrollProps {
    messagesJson: {};
}

export const AppProvider = (props: AppProps) => {
    const [appValue, setAppValue] = React.useState((): AppContextProps => ({
        openModal: true,
        initialized: false
    }));
    useEffect(()=>{
        const menuService = new MenuService();
        menuService.menus().then(menus => {
            setAppValue({
                openModal: false,
                initialized: true,
                menus
            })
        });
    },[]);
    if(!appValue.initialized){
        return preLoadingView();
    }

    return (<AppContext.Provider value={appValue}>
        <LocalProvider messagesJson={props.messagesJson}>
            <Modal open={appValue.openModal}>
                <Box>waiting...</Box>
            </Modal>
            <RouteProvider/>
        </LocalProvider>
    </AppContext.Provider>);
};

const preLoadingView = function () {
    return <div id="loading">
        <div id="loading-center">
            <div id="loading-center-absolute">
                <div className="loader"></div>
            </div>
        </div>

    </div>;
}

export const useApp = () => {
    return React.useContext(AppContext);
};