import * as React from 'react';
import {
    Box,
    Modal,
    Typography
} from "@mui/material";
import "@fontsource/roboto"; // Defaults to weight 400
import "@common/assets/scss/main.scss";
import {Context, useEffect} from "react";
import MenuModel from "@common/model/MenuModel";
import MenuService from "@common/service/MenuService";
import {RouteProvider} from "@common/provider/RouteProvider";
import {LocalProvider, useLocal} from "@common/provider/LocalProvider";

interface AppContextProps {
    initialized: boolean;
    menus?: MenuModel[];

    openWaiting(): void;
    closeWaiting(): void;
}

const AppContext: Context<AppContextProps> = React.createContext<AppContextProps>({
    initialized: false,
    openWaiting() {},
    closeWaiting() {}
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
    const [openModal, setOpenModal] = React.useState(true);
    const [appValue, setAppValue] = React.useState((): AppContextProps => ({
        initialized: false,
        openWaiting() {},
        closeWaiting() {}
    }));
    useEffect(()=>{
        const menuService = MenuService.INSTANCE;
        menuService.loadAllModels().then(menus => {
            setAppValue({
                initialized: true,
                menus,
                openWaiting() {
                    setOpenModal(true);
                },
                closeWaiting() {
                    setOpenModal(false);
                }
            })
        });
        // setOpenModal(false);
    },[]);
    if(!appValue.initialized){
        return preLoadingView();
    }

    return (<AppContext.Provider value={appValue}>
        <LocalProvider messagesJson={props.messagesJson}>
            <Modal open={openModal}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description" >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {useLocal().getCommonMessage('waiting')}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
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