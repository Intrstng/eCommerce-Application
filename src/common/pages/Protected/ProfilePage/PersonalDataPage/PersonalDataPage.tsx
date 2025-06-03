import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { STYLES } from './styles.personalDataPage';
import { useState } from 'react';
import { PersonalNotEditableData } from '../../../../components/PersonalData/PersonalNotEditableData';
import { PersonalEditableData } from '../../../../components/PersonalData/PersonalEditableData';

export const PersonalDataPage = () => {
    const [isEditable, setIsEditable] = useState(false);

    const toggleIsEditableHandler = (isEdit: boolean) => {
        setIsEditable(isEdit);
    };

    return (
        <Box sx={STYLES.personalContent}>
            <Typography variant="h3" component="h3" sx={STYLES.personalTitle}>
                Your Information
            </Typography>

            {isEditable ? (
                <PersonalEditableData toggleIsEditable={toggleIsEditableHandler} />
            ) : (
                <PersonalNotEditableData toggleIsEditable={toggleIsEditableHandler} />
            )}
        </Box>
    );
};
