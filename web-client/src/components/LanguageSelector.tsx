import * as React from 'react';
import {FormControl, InputLabel, Select, SelectChangeEvent} from '@mui/material';

import {FormattedMessage} from 'react-intl';

import MenuItem from "@mui/material/MenuItem";

interface LanguageSelectorProps {
    locale: string;
    handleLocale: (locale: string) => void;
}

function LanguageSelector({locale, handleLocale}: LanguageSelectorProps) {

    const handleChangeLocale = (event: SelectChangeEvent) => {
        handleLocale(event.target.value as string);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="laguage-select-label">
                <FormattedMessage id={'language'} defaultMessage='Language'/>
            </InputLabel>
            <Select
                labelId="laguage-select"
                id="laguage"
                autoWidth
                label=""
                value={locale}
                onChange={handleChangeLocale}>
                <MenuItem value={"en-US"}><FormattedMessage id={'language.english'} defaultMessage="English"/></MenuItem>
                <MenuItem value={"fa-IR"}><FormattedMessage id={'language.persian'} defaultMessage="Persian"/></MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSelector;
