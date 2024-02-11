import * as React from "react";
import US from "country-flag-icons/react/1x1/US";
import IR from "country-flag-icons/react/1x1/IR";
import {enUS, Localization} from "@mui/material/locale";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ToggleLocaleProps {
    locale: Localization,
    toggleLocale: () => void
}

function ToggleLocale({locale, toggleLocale}: ToggleLocaleProps) {
    return (
        <Box sx={{maxWidth: '32px'}}>
            <Button
                variant="text"
                onClick={toggleLocale}
                size="small"
                aria-label="button to toggle theme"
                sx={{minWidth: '32px', height: '32px', p: '4px'}}
            >
                {locale == enUS ?
                    <US title='United States'/>:
                    <IR title='Persian'/>}

            </Button>
        </Box>
    );
}

export default ToggleLocale;