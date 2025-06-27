import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    clearCartDialog: {
        width: '320px',
        padding: '1.25rem 1.25rem 0.5em',
        borderRadius: '0.25rem',
        textAlign: 'center',
    },
    clearCartDialogTitle: {
        mb: '0.25rem',
        fontFamily: 'Cormorant, serif',
        fontSize: '1.8rem',
        fontWeight: 500,
        textAlign: 'left',
        lineHeight: '2.2rem',
        color: '#000',
    },
    clearCartDialogSubtitle: {
        fontFamily: 'Jost, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.5rem',
        color: '#161412',
    },
    clearCartDialogControls: {
        justifyContent: 'flex-end',
        gap: '0.625rem',
        paddingBottom: '1.25rem',
        paddingRight: '1.25rem',
    },
    cancelCartDialogButton: {
        textTransform: 'capitalize',
        fontFamily: 'Jost, sans-serif',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
            borderColor: '#000',
        },
    },
    clearCartDialogButton: {
        textTransform: 'capitalize',
        fontFamily: 'Jost, sans-serif',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#65635f',
        color: '#fff',
        borderColor: '#000',
        '&:hover': {
            backgroundColor: '#000',
        },
    },
});
