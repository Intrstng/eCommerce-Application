import { genStyles } from '../../../common/utils/generate-styles';

export const STYLES = genStyles({
    catalogContainer: {
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
    },
    catalogTitle: {
        mb: '0.4rem',
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
    cards: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 23.125rem)',
        gap: '3.75rem 2.15rem',
        justifyContent: 'center',

        '@media (max-width: 1280px)': {
            gridTemplateColumns: 'repeat(3, 20rem)',
            gap: '1.5rem 0.8rem',
        },

        '@media (max-width: 950px)': {
            gridTemplateColumns: 'repeat(2, 21.875rem)',
            gap: '2.3rem 1.5rem',
        },

        '@media (max-width: 768px)': {
            gridTemplateColumns: '21.875rem',
            columnGap: '3.75rem',
            paddingBottom: '2rem',
        },
    },
});
