import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    passwordTitle: {
        mb: '2.5rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#161412',
    },
    passwordsContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    passwordsForm: {
        maxWidth: '23.5rem',
        width: '100%',
        '@media (max-width: 690px)': {
            maxWidth: 'unset',
        },
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
        '@media (max-width: 690px)': {
            flexDirection: 'column',
            mb: 2,
        },
    },
    passInput: {
        height: '2.6rem',
        fontSize: '0.9rem',
        mt: 0,
        mb: 3,
        '@media (max-width: 690px)': {
            mb: '1.7rem',
        },
    },
    passwordButton: {
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
    cancelButton: {
        mt: 0,
        mb: '0.6rem',
        color: '#000',
        backgroundColor: '#FFF',
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
