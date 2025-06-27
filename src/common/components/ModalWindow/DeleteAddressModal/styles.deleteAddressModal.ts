import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    deleteDialog: {
        '& .MuiPaper-root': {
            padding: '1.25rem',
            borderRadius: '0',
            width: '25rem',
        },
    },
    deleteDialogTitle: {
        marginBottom: '0.25rem',
        fontFamily: 'Cormorant, serif',
        fontSize: '1.8rem',
        fontWeight: 500,
        textAlign: 'left',
        lineHeight: '2.2rem',
        color: '#000',
    },
    deleteDialogSubtitle: {
        marginBottom: '1rem',
        fontFamily: 'Jost, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.5rem',
        color: '#161412',
    },
    deleteDialogControls: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
    },
    cancelDialogButton: {
        textTransform: 'capitalize',
        fontFamily: 'Jost, sans-serif',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#000',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
            borderColor: '#000',
        },
    },
    deleteDialogButton: {
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
