import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    heroSearchCatalog: {
        margin: '0 auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '48px',
        padding: '0 20px',
        border: '1px solid rgba(0, 0, 0, 0)',
        borderRadius: '4px',
        backgroundColor: 'rgb(22, 20, 18)',
        transition: 'all 0.3s ease-in-out',
        gap: '0.25rem',
        fontFamily: 'Jost, sans-serif',
        fontSize: '1rem',
        fontWeight: 300,
        lineHeight: '1rem',
        textTransform: 'capitalize',
        color: 'rgb(244, 244, 242)',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: 'transparent',
            border: '1px solid rgb(22, 20, 18)',
            color: 'rgb(22, 20, 18)',
        },
        '@media (max-width: 480px)': {
            fontSize: '0.75rem',
        },
    },
});
