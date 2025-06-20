import { genStyles } from '../../../../utils/generate-styles';

export const STYLES = genStyles({
    passwordTitle: {
        mb: '1rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#161412',
    },
    passwordsContent: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        mb: '2rem',
    },
    passwordsForm: {
        maxWidth: '23.5rem',
        width: '100%',
    },
    errorForm: {
        position: 'absolute',
        left: 0,
        top: '2.75rem',
        color: '#d20000',
        fontFamily: 'Arial',
        fontSize: '0.6rem',
    },
    formPass: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '0.5rem',
        mb: 1,
    },
    passInput: {
        height: '2.6rem',
        fontSize: '0.9rem',
        mt: 0,
        mb: '1.7rem',
    },
    passwordButton: {
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.75rem',
        lineHeight: '1.5rem',
        letterSpacing: '1px',
        pt: '0.375rem',
        pb: '0.375rem',
        boxShadow: 'unset',
        border: '1px solid #000',
        borderRadius: 0,
        transition: '0.3s all ease-in-out',
        '&:disabled': {
            border: '1px solid rgba(101, 99, 95, 0.65)',
            backgroundColor: 'rgba(101, 99, 95, 0.15)',
        },
    },
    cancelButton: {
        mt: 0,
        mb: '0.6rem',
        color: '#65635F',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
        },
    },
    submitButton: {
        mt: 0,
        mb: 0,
        color: '#FFF',
        backgroundColor: '#000',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
            backgroundColor: '#FFF',
        },
    },
});
