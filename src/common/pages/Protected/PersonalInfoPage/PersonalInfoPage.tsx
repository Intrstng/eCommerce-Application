import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CustomButton } from '../../../buttons/CustomButton';
import { STYLES } from './styles.personalInfoPage';
import S from './PersonalInfoPage.module.scss';

export const PersonalInfoPage = () => {
    return (
        <Box>
            <Typography variant="h3" component="h3" sx={STYLES.personalTitle}>
                Your Information
            </Typography>

            <Box sx={STYLES.personalInfoContent}>
                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Email:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        Some name
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        First Name:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        Some name
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Last Name:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        Some name
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Date of Birth:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        Some name
                    </Typography>
                </Box>
            </Box>

            <CustomButton className={S.editButton}>Edit profile</CustomButton>
        </Box>
    );
};
