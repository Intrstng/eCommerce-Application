import { genStyles } from '../../utils/generate-styles.ts';

export const STYLES = genStyles({
    authorPageContent: {
        // width: 'calc(100% - 2rem)',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 1rem',
    },

    authorContent: {
        // width: '100%',
        maxWidth: '40rem',
        margin: '2rem auto 1.5rem',
    },

    authorTitle: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontFamily: '"Cormorant", serif',
        fontSize: '3.25rem',
        fontWeight: '500',
    },
    authorImageContainer: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    authorImage: {
        img: {
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '3px solid #f0f0f0',
            objectFit: 'cover',
        },
    },
    sectionTitle: {
        marginTop: '1.5rem',
        marginBottom: '1rem',
        color: '#65635f',
        fontFamily: '"Jost", sans-serif',
        fontSize: '1.3rem',
        fontWeight: '500',
        borderBottom: '1px solid #eee',
        paddingBottom: '0.5rem',
    },
    authorText: {
        color: '#65635f',
        textAlign: 'justify',
        fontSize: '1rem',
        fontWeight: '400',
        fontFamily: '"Jost", sans-serif',
    },
    authorClosing: {
        marginTop: '2rem',
        textAlign: 'right',
        fontFamily: '"Jost", sans-serif',
        fontStyle: 'italic',
        color: '#65635f',
    },
});
