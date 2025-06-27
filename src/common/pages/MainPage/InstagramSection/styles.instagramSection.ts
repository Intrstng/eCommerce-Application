import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    ctaButton: {
        margin: '0 auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: 'fit-content',
        height: '48px',
        padding: '0 20px',
        border: '1px solid rgb(101, 99, 95)',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease-in-out',
        gap: '0.25rem',
        fontFamily: 'Jost, sans-serif',
        fontSize: '1rem',
        fontWeight: 300,
        lineHeight: '1rem',
        color: 'rgb(22, 20, 18)',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: '#161412',
            border: '1px solid #161412',
            color: '#fff',
            boxShadow: 'none',
        },
    },
});
