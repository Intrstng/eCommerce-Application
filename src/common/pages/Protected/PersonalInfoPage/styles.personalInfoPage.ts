import { genStyles } from '../../../utils/generate-styles';

export const STYLES = genStyles({
    personalTitle: {
        mb: '2.5rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#161412',
    },
    personalInfoContent: {
        mb: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
    },
    personalInfo: {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '20rem',
        width: '100%',
    },
    personalItemTitle: {
        width: '6rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.19rem',
        color: '#65635F',
        overflow: 'hidden',
    },
    personalItemInfo: {
        width: '10rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.19rem',
        color: '#000000',
        overflow: 'hidden',
    },
});
