import { Profile } from '../../../../features/profile/ui/Profile';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.profilePage';
import type { Customer } from '@commercetools/platform-sdk';
import { profileCustomerSelector } from '../../../../features/profile/model/selectors/profileSelector';
import { useAppSelector } from '../../../hooks';
import { BreadCrumbs } from '../../../components/BreadCrumbs/BreadCrumbs';

export const ProfilePage = () => {
    const currentUser: Customer | null = useAppSelector<Customer | null>(profileCustomerSelector);
    const firstName = currentUser?.firstName;

    return (
        <>
            <BreadCrumbs />
            <Box sx={STYLES.profilePageContent}>
                <Typography variant="h2" component="h2" sx={STYLES.profileTitle}>
                    Welcome back, {firstName}!
                </Typography>
                <Typography variant="h3" component="h3" sx={STYLES.profileSubtitle}>
                    Enjoy shopping with ease and happiness
                </Typography>
            </Box>
            <Profile />
        </>
    );
};
