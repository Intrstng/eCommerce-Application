import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import authorImage from 'src/assets/articles/author.png';
import { STYLES } from './styles.authorPage';
import { AUTHOR_TEXT } from './authorText';

export const AuthorPage = () => {
    return (
        <Box sx={STYLES.authorPageContent}>
            <BreadCrumbs />
            <Box component="section" sx={STYLES.authorContent}>
                <Typography variant="h3" sx={STYLES.authorTitle}>
                    {AUTHOR_TEXT.welcome}
                </Typography>
                <Box sx={STYLES.authorImageContainer}>
                    <Box sx={STYLES.authorImage}>
                        <img src={authorImage} alt="Author" />
                    </Box>
                </Box>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: AUTHOR_TEXT.aboutMe }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {AUTHOR_TEXT.ourJourneyTitle}
                </Typography>

                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: AUTHOR_TEXT.ourJourney }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {AUTHOR_TEXT.whatWeValueTitle}
                </Typography>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: AUTHOR_TEXT.whatWeValue }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {AUTHOR_TEXT.joinCommunityTitle}
                </Typography>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: AUTHOR_TEXT.joinCommunity }} />

                <Typography sx={STYLES.authorClosing}>{AUTHOR_TEXT.closing}</Typography>
            </Box>
        </Box>
    );
};
