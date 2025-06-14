import { genStyles } from '../../../../common/utils/generate-styles';

export const STYLES = genStyles({
    card: {
        borderRadius: 0,
        boxShadow: 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        //height: "30rem",
        textDecoration: 'none',
        '&:hover': {
            '& .cardImage': {
                transform: 'scale(1.04) translateY(-6px)',
            },
            '& .cardTitle': {
                color: 'purple',
            },
            '& .cardText': {
                color: '#161412',
            },
            '& .cardPrice': {
                color: 'green',
            },
        },
    },
    link: {
        textDecoration: 'none',
    },
    cardImageContainer: {
        position: 'relative',
    },
    cardImage: {
        overflow: 'hidden',
        display: 'inline-block',

        width: '100%',
        height: '23.125rem',

        backgroundPosition: 'center',
        backgroundSize: 'cover',

        transition: 'transform 0.8s ease',
    },
    cardImageLoading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'background.paper',
    },
    cardContent: {
        padding: '0 !important',
        marginTop: '0.625rem',
    },
    cardFont: {
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        transition: 'color 0.3s ease-in',
    },
    cardTitle: {
        marginBottom: '0.25rem',
        textTransform: 'uppercase',
        fontSize: '0.81rem',
        lineHeight: '1.56rem',
        letterSpacing: '1px',
        color: '#161412',
    },
    cardText: {
        marginBottom: '0.25rem',
        fontSize: '0.875rem',
        lineHeight: '1.19rem',
        color: '#65635F',
        letterSpacing: '1px',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        whiteSpace: 'unset',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // maxWidth: '40ch',
    },
    cardPrice: {},
});
