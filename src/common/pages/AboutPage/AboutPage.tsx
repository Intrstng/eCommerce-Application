import { STYLES } from './styles.aboutPage';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import { teamMembers } from '../../../assets/data/team-members';
import { TeamMemberCard } from '../../components/TeamMemberCard/TeamMemberCard';
import Typography from '@mui/material/Typography';
import rsLogo from '../../../assets/logo/rs_school.png';

export const AboutPage = () => {
    return (
        <Box sx={STYLES.aboutPageContent}>
            <BreadCrumbs />
            <Box component="section" sx={STYLES.aboutContent}>
                <Typography variant="h3" sx={STYLES.aboutTitle}>
                    Our Team
                </Typography>
                <Box sx={STYLES.teamMembersContainer}>
                    {teamMembers.map(member => (
                        <TeamMemberCard key={member.name} member={member} />
                    ))}
                </Box>
                <Box sx={STYLES.rsSchoolLogoContainer}>
                    for
                    <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
                        <img src={rsLogo} alt="RS School Logo" />
                    </a>
                    in 2025
                </Box>
            </Box>
        </Box>
    );
};
