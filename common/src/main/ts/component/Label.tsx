import * as React from "react";
import {Stack, Box} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

interface LabelProps {
    label: string;
    value: string;
}

export const Label = ({label, value}: LabelProps) => {
    return <Stack direction="row">
        <Item>{label}:</Item>
        <Item>{value}</Item>
    </Stack>
}