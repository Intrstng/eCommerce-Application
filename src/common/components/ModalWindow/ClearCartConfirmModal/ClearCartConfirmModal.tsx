import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { STYLES } from './styles.clearCartConfirmModal';
import type { ClearCartConfirmModalProps } from './interfaces';

export const ClearCartConfirmModal: FC<ClearCartConfirmModalProps> = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <DialogContent sx={STYLES.clearCartDialog}>
                <Typography variant="h6" sx={STYLES.clearCartDialogTitle}>
                    Confirm Cart Clear
                </Typography>
                <Typography sx={STYLES.clearCartDialogSubtitle}>Are you sure you want to clear your cart?</Typography>
            </DialogContent>
            <DialogActions sx={STYLES.clearCartDialogControls}>
                <Button variant="outlined" color="inherit" onClick={onCancel} sx={STYLES.cancelCartDialogButton}>
                    Cancel
                </Button>
                <Button variant="outlined" color="inherit" onClick={onConfirm} sx={STYLES.clearCartDialogButton}>
                    Clear Cart
                </Button>
            </DialogActions>
        </Dialog>
    );
};
