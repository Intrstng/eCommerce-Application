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
        marginBottom: '1rem',
    },
    deleteDialogSubtitle: {
        marginBottom: '1rem',
    },
    deleteDialogControls: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
    },
    deleteDialogButton: {
        borderRadius: '0',
        textTransform: 'none',
    },
});
