import Typography from '@mui/material/Typography';
import { STYLES } from './styles.deleteAddressModal';
import Box from '@mui/material/Box';
import type { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export type DeleteAddressModalProps = {
    isOpen: boolean;
    modalCancelDeleteCB: () => void;
    modalConfirmDeleteCB: () => void;
};

export const DeleteAddressModal: FC<DeleteAddressModalProps> = ({
    isOpen,
    modalCancelDeleteCB,
    modalConfirmDeleteCB,
}) => {
    return (
        <Dialog open={isOpen} onClose={modalCancelDeleteCB} sx={STYLES.deleteDialog}>
            <Typography variant="h6" sx={STYLES.deleteDialogTitle}>
                Confirm Delete
            </Typography>
            <Typography sx={STYLES.deleteDialogSubtitle}>Are you sure you want to delete this address?</Typography>
            <Box sx={STYLES.deleteDialogControls}>
                <Button variant="outlined" onClick={modalCancelDeleteCB} sx={STYLES.deleteDialogButton}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={modalConfirmDeleteCB} sx={STYLES.deleteDialogButton}>
                    Delete
                </Button>
            </Box>
        </Dialog>
    );
};
