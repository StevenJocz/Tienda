import { FormControl, LinearProgress, TextField, Theme, linearProgressClasses, styled } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function getStyles(name: string, selectedValues: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedValues.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

export const StyledTextField = styled(TextField)({
    width: '100%',
    background: '#fff',
    marginBottom: '20px',
});

export const StyledFormControl = styled(FormControl)({
    width: '100%',
    background: '#fff',
    marginBottom: '20px',
});



export const BorderLinearProgress = styled(LinearProgress)(({ theme, value = 0 }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: getColor(value, theme.palette.mode === 'light'),
    },
}));

export const getColor = (value: number, isLightMode: boolean) => {
    if (value <= 10) {
        return isLightMode ? '#f76b6a' : '#ff9999';
    } else if (value <= 50) {
        return isLightMode ? '#ffcc00' : '#ffeb3b';
    } else {
        return isLightMode ? '#08ac80' : '#0be5ab';
    }
};