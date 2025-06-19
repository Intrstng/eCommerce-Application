import { genStyles } from '../../../common/utils/generate-styles';

export const STYLES = genStyles({
    profileContent: {
        maxWidth: '35rem',
        minWidth: '18rem',
        // '@media (max-width: 600px)': {
        //     width: '24rem',
        // },
        // '@media (max-width: 400px)': {
        //     width: '23rem',
        // },
    },
    devider: {
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
