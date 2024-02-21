import * as React from 'react';
import {US, IR} from 'country-flag-icons/react/3x2';

import {useIntl} from 'react-intl';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface ToggleLocaleProps {
    locale: string;
    toggleLocale: () => void
}

function ToggleLocale({locale, toggleLocale}: ToggleLocaleProps) {
    const intl = useIntl();

    return (
        <Box sx={{maxWidth: '32px'}}>
            <Button
                variant="text"
                onClick={toggleLocale}
                size="small"
                lang={locale}
                title={intl.formatMessage({id: 'language'})}
                aria-label="button to toggle theme"
                sx={{minWidth: '32px', height: '32px', p: '4px'}}
            >
                {locale === 'fa-IR' ?
                    <IR style={{width: 30, height: 30, borderRadius: 100}}/> :
                    <US style={{width: 30, height: 30, borderRadius: 100}}/>}
            </Button>
        </Box>
    );
}

export default ToggleLocale;