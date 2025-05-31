import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { STYLES } from './styles.personalDataPage';
import { useAppDispatch } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { getCurrentCustomerTC } from '../../../../../features/profile/model/slices/__tests__/profileSlice';
import { PersonalNotEditableData } from '../../../../components/PersonalData/PersonalNotEditableData';
import { PersonalEditableData } from '../../../../components/PersonalData/PersonalEditableData';


export const PersonalDataPage = () => {
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useAppDispatch();

    const toggleIsEditableHandler = (isEdit: boolean) => {
        setIsEditable(isEdit);
    };

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box>
            <Typography variant="h3" component="h3" sx={STYLES.personalTitle}>
                Your Information
            </Typography>

            { isEditable ? <PersonalEditableData toggleIsEditable={toggleIsEditableHandler}/>
                         : <PersonalNotEditableData toggleIsEditable={toggleIsEditableHandler}/> }
        </Box>
    );
};