import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import authorImage from 'src/assets/articles/author.png';
import { STYLES } from './styles.authorPage';

export const AuthorPage = () => {
    const authorText = {
        welcome: 'Welcome to Do Jewelry!',
        aboutMe:
            "I'm Katya, the founder and lead jeweler here at <strong>Do Jewelry</strong>. My passion for creating unique jewelry began many years ago in my hometown of Vitebsk. Since then, every bracelet, ring, or pendant that leaves my hands carries a piece of my world, inspiration, and dedication to the craft.",
        ourJourneyTitle: 'Our Journey',
        ourJourney:
            "<strong>Do Jewelry</strong> is not just a store, it's a place where metal comes alive, transforming into something far more significant than just an accessory. These are symbols of your individuality, luxurious additions to your style that, I hope, will bring you as much joy as they bring me in their creation.",
        whatWeValueTitle: 'What We Value',
        whatWeValue:
            "My goal is to create jewelry that makes you feel special, that inspires and uplifts. I believe in quality, attention to detail, and a unique approach. That's why every piece at <strong>Do Jewelry</strong> is handcrafted with the utmost attention to the finest details.",
        joinCommunityTitle: 'Join Our Community',
        joinCommunity:
            'I invite you to become a part of our creative journey: follow collection updates, participate in special promotions, and, of course, find the perfect jewelry that speaks directly to your heart.',
        closing: 'With gratitude and warmth, Katya',
    };

    return (
        <Box sx={STYLES.authorPageContent}>
            <BreadCrumbs />
            <Box component="section" sx={STYLES.authorContent}>
                <Typography variant="h3" sx={STYLES.authorTitle}>
                    {authorText.welcome}
                </Typography>
                <Box sx={STYLES.authorImageContainer}>
                    <Box sx={STYLES.authorImage}>
                        <img src={authorImage} alt="Author" />
                    </Box>
                </Box>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: authorText.aboutMe }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {authorText.ourJourneyTitle}
                </Typography>

                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: authorText.ourJourney }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {authorText.whatWeValueTitle}
                </Typography>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: authorText.whatWeValue }} />

                <Typography variant="h5" component="h3" sx={STYLES.sectionTitle}>
                    {authorText.joinCommunityTitle}
                </Typography>
                <Typography sx={STYLES.authorText} dangerouslySetInnerHTML={{ __html: authorText.joinCommunity }} />

                <Typography sx={STYLES.authorClosing}>{authorText.closing}</Typography>
            </Box>
        </Box>
    );
};
