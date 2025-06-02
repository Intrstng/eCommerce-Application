import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    profilePageContent: {
        //width: '100%', add
        //maxWidth: '1180px',
        // width: '1180px', try after cross-check
        mb: '1.5rem',
        // '@media (max-width: 950px)': {
        //     minWidth: '768px',
        // },
    },
    profileTitle: {
        mb: '0.25rem',
        fontFamily: 'Cormorant, serif',
        fontWeight: '500',
        fontSize: '3.25rem',
        lineHeight: '3.9rem',
        color: '#000000',
        '@media (max-width: 768px)': {
            fontSize: '2rem',
            lineHeight: '2.5rem',
        },
    },
    profileSubtitle: {
        fontFamily: 'Jost, sans-serif',
        fontWeight: '500',
        fontSize: '0.875rem',
        lineHeight: '1.19rem',
        color: '#5E5E5E',
        '@media (max-width: 768px)': {
            fontSize: '0.7rem',
            lineHeight: '1rem',
        },
    },
});
