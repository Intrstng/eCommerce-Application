import type { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.teamMemberCard.ts';
import type { TeamMemberCardProps } from './interfaces';

export const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => {
    return (
        <Box sx={STYLES.card}>
            <Box sx={STYLES.githubLinkBox}>
                <Box sx={STYLES.imageContainer}>
                    <img src={member.githubImage} alt={member.name} />
                </Box>
                <Box sx={STYLES.githubLink}>
                    <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
                        {member.githubUrl}
                    </a>
                </Box>
            </Box>
            <Box sx={STYLES.textContainer}>
                <Typography variant="h5" sx={STYLES.name}>
                    {member.name}
                </Typography>
                <Typography variant="body2" sx={STYLES.role}>
                    {member.role}
                </Typography>
                <Typography variant="body2" sx={STYLES.description}>
                    {member.description}
                </Typography>
            </Box>
        </Box>
    );
};
