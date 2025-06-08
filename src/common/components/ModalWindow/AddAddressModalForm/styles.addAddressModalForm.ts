import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    addressModal: {
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    modalTitle: {
        mb: '1rem',
        fontFamily: 'Jost, sans-serif',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        fontWeight: '400',
        color: '#000',
        letterSpacing: '0.1em',
    },
    modalForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
        minWidth: '22.8rem',
        width: '100%',
        '@media (max-width: 690px)': {
            minWidth: '20rem',
        },
    },
    addressInput: {
        mt: 0,
        mb: '0.25rem',
    },
    addressInputMedia: {
        '@media (max-width: 950px)': {
            mb: 1,
        },
        '@media (max-width: 690px)': {
            mb: '1rem',
        },
    },
    autofillInput: {
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px rgba(250, 237, 202, 0.4) inset',
            WebkitTextFillColor: '#205781',
        },
    },
    countryInput: {
        width: 'auto',
        minWidth: '200px',
        maxWidth: '100%',
    },
    countryLabel: {
        mt: '-0.15rem',
    },
    errorForm: {
        position: 'absolute',
        left: 0,
        top: '3.2rem',
        color: '#d20000',
        fontFamily: 'Arial',
        fontSize: '0.6rem',
    },
    errorName: {
        bottom: 1,
    },
    errorMail: {
        bottom: 3,
    },
    errorPass: {
        top: '3.4rem',
    },
    errorConfirmPass: {
        top: '2.8rem',
    },
    defaultShippingAddressCheckbox: {
        '& .MuiFormControlLabel-label': {
            fontFamily: 'Jost, sans-serif',
            fontWeight: '400',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            color: '#000',
        },
        mt: 0,
        mb: 0,
    },
    defaultBillingAddressCheckbox: {
        '& .MuiFormControlLabel-label': {
            fontFamily: 'Jost, sans-serif',
            fontWeight: '400',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            color: '#000',
        },
        mb: 0,
    },
    modalButton: {
        width: '100%',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.75rem',
        lineHeight: '1.5rem',
        letterSpacing: '1px',
        pt: '0.375rem',
        pb: '0.375rem',
        boxShadow: 'unset',
        border: '1px solid #000',
        transition: '0.3s all ease-in-out',
        '&:disabled': {
            border: '1px solid rgba(101, 99, 95, 0.65)',
            backgroundColor: 'rgba(101, 99, 95, 0.15)',
        },
    },
    modalControls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        gap: '0.6rem',
    },
    modalCancelButton: {
        mt: 0,
        mb: 0,
        color: '#65635F',
        backgroundColor: '#FFF',
        borderRadius: 0,
        '&:hover': {
            color: '#000',
        },
    },
    modalAddAddressButton: {
        mt: 0,
        mb: 0,
        color: '#FFF',
        backgroundColor: '#000',
        borderRadius: 0,
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
            backgroundColor: '#FFF',
        },
    },
});
