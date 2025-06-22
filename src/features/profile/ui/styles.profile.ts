import { genStyles } from '../../../common/utils/generate-styles';

export const STYLES = genStyles({
    profileContent: {
        maxWidth: '32.125rem',
        minWidth: '18rem',
        '@media (max-width: 390px)': {
            maxWidth: '20.5rem',
        },
    },
    divider: {
        mb: '1.875rem',
    },
    profileSubtitle: {
        mb: '2.5rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#161412',
    },
});
