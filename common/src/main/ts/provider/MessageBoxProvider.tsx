import * as React from 'react';
import {
    Stack,
    Box,
    Modal,
    Typography
} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import PendingIcon from "@mui/icons-material/Pending";
import {useLocal} from "@common/provider/LocalProvider";

interface MessageBoxContextProps {

}

const MessageBoxContext = React.createContext<MessageBoxContextProps>({
});

interface MessageBoxProps {
    open: boolean;
}
export const MessageBoxProvider = ({open}:MessageBoxProps) => {
    const local = useLocal();
    const value = React.useMemo(
        () => ({
        }),
        []
    );
    return <MessageBoxContext.Provider value={value}>
        <Modal open={open}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description" >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
            }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <PendingIcon sx={{color: lightBlue[700]}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {local.getCommonMessage('waiting')}
                    </Typography>
                </Stack>
            </Box>
        </Modal>
    </MessageBoxContext.Provider>
}

export const useMessageBox = () => {
    return React.useContext<MessageBoxContextProps>(MessageBoxContext);
};