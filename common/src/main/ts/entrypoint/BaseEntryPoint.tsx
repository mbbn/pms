import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createTheme, Theme} from "@mui/material";
import {AuthProvider} from "@common/hooks/AuthProvider";
import {LocalProvider} from "@common/hooks/LocalProvider";
import {defaultTheme} from "@common/theme/defaultTheme";
import UserService from "@common/service/UserService";
import {useEffect, useState} from "react";

interface AppContextProps {
    uiTheme?: Theme
}

const AppContext = React.createContext<AppContextProps>({
    uiTheme: createTheme(defaultTheme)
});
export const useApp = () => {
    return React.useContext(AppContext);
};

export const render = (messagesJson: {}) => {
    let ROOT_DIV_ID = '@rootDiv@';
    const rootElement = document.getElementById(ROOT_DIV_ID);
    const root = createRoot(rootElement);
    const appContext = {};

    root.render(
        <AuthProvider>
            <AppContext.Provider value={appContext}>
                <LocalProvider messages={messagesJson} lang={"fa"}>salam</LocalProvider>
            </AppContext.Provider>
        </AuthProvider>);
};