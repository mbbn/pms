import * as React from 'react';
import {US, IR} from 'country-flag-icons/react/3x2';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import i18n from '../i18n/i18n';

interface ToggleLocaleProps {
}

function ToggleLocale({}: ToggleLocaleProps) {
    const { t , changeLanguage, language} = i18n;
    const handleClick = () => {
        changeLanguage(language === 'fa' ? 'en' : 'fa', () => {
            window.location.reload();
        });
    };
    const title = t('language');

    return (
        <Box sx={{maxWidth: '32px'}}>
            <Button
                variant="text"
                onClick={handleClick}
                size="small"
                lang={language}
                title={title}
                aria-label="button to toggle theme"
                sx={{minWidth: '32px', height: '32px', p: '4px'}}
            >
                {language === 'fa' ?
                    <IR style={{width: 30, height: 30, borderRadius: 100}}/> :
                    <US style={{width: 30, height: 30, borderRadius: 100}}/>}
            </Button>
        </Box>
    );
}

export default ToggleLocale;