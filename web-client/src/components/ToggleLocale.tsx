import * as React from 'react';
import {SelectChangeEvent} from '@mui/material';
import {US, IR} from 'country-flag-icons/react/3x2';

import {useIntl} from 'react-intl';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface ToggleLocaleProps {
    locale: string;
    handleLocale: (locale: string) => void;
}

function ToggleLocale({locale, handleLocale}: ToggleLocaleProps) {
    const intl = useIntl();

    const handleChangeLocale = (event: SelectChangeEvent) => {
        handleLocale(event.target.value as string);
    };

    return (
        <Box sx={{maxWidth: '32px'}}>
            <Button
                variant="text"
                onClick={() => {
                    handleLocale(locale === 'fa-IR' ? 'en-US' : 'fa-IR')
                }}
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
