import { FormControl, TextField, Theme, styled } from "@mui/material";

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