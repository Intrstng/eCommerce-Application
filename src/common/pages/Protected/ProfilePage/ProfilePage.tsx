import { Profile } from '../../../../features/profile/ui/Profile';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.profilePage';

export const ProfilePage = () => {
    return (
        <>
            <Box sx={STYLES.profilePageContent}>
                <Typography variant="h2" component="h2" sx={STYLES.profileTitle}>
                    Welcome back!
                </Typography>
                <Typography variant="h3" component="h3" sx={STYLES.profileSubtitle}>
                    Enjoy shopping with ease and happiness
                </Typography>
            </Box>
            <Profile />
        </>
    );
};
