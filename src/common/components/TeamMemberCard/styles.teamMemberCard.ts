import { genStyles } from '../../utils/generate-styles.ts';

export const STYLES = genStyles({
    card: {
        width: '70%',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '1.5rem',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        justifyContent: 'space-around',
        // transition: 'transform 0.3s ease-in-out',
        '&:nth-child(2)': {
            alignSelf: 'flex-end',
        },
        // '&:hover': {
        //     transform: 'translateY(-5px)',
        // },
        '@media (max-width: 768px)': {
            width: '90%',
            flexDirection: 'column',
            '&:nth-child(2)': {
                alignSelf: 'auto',
            },
        },
    },
    githubLinkBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    imageContainer: {
        width: '8rem',
        height: '8rem',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: '1rem',

        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem',
        width: '60%',
        '@media (max-width: 768px)': {
            width: '85%',
        },
    },
    name: {
        fontFamily: '"Cormorant", serif',
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#333',
    },
    role: {
        fontFamily: '"Jost", sans-serif',
        fontSize: '1rem',
        color: '#919191',
    },
    description: {
        fontFamily: '"Jost", sans-serif',
        fontSize: '0.85rem',
        color: '#555',
        lineHeight: '1.4',
    },
    githubLink: {
        a: {
            fontFamily: '"Jost", sans-serif',
            fontSize: '0.9rem',
            color: '#547792',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
                color: '#A55B4B',
            },
        },
    },
});
