import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    authButton: {
        cursor: 'pointer',
        transition: '0.3s all ease',
        '&:hover': {
            transform: 'scale(1.07)',
        },
    },
    devider: {
        width: '100%',
        my: '0.3rem',
    },
    popover: {
        mt: '0.45rem',
    },
    popoverLinks: {
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    dashboardLink: {
        textDecoration: 'none',
    },
    dashboardBtn: {
        padding: '0',
        textTransform: 'capitalize',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.81rem',
        lineHeight: '1.5rem',
        letterSpacing: '0.1em',
        color: '#65635F',
        transition: '0.3s all ease-in-out',
        '&:hover': {
            color: '#161412',
        },
    },
});
