import { genStyles } from '../../utils/generate-styles.ts';

export const STYLES = genStyles({
    aboutPageContent: {
        maxWidth: '1180px',
        margin: '2rem auto 1.5rem',
        padding: '0 1rem',
    },
    aboutTitle: {
        marginBottom: '0.4rem',
        fontFamily: '"Cormorant", serif',
        fontWeight: '500',
        fontSize: '3.25rem',
        lineHeight: '3.9rem',
    },
    teamMembersContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
    },
    rsSchoolLogoContainer: {
        fontFamily: '"Jost", sans-serif',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1.5rem',
        img: {
            width: '4rem',
        },
    },
});
