import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export type ClearCartConfirmModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const ClearCartConfirmModal: FC<ClearCartConfirmModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
}) => {
    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <DialogContent
                sx={{
                    width: '320px',
                    padding: '1.25rem',
                    borderRadius: '0.25rem',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'Cormorant, serif',
                        fontSize: '1.8rem',
                        fontWeight: 500,
                        lineHeight: '2.2rem',
                        color: '#000',
                    }}
                >
                    Confirm Cart Clear
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 400,
                        lineHeight: '1.5rem',
                        color: '#161412',
                    }}
                >
                    Are you sure you want to clear your cart?
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    gap: '0.625rem',
                    paddingBottom: '1.25rem',
                    paddingRight: '1.25rem',
                }}
            >
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onCancel}
                    sx={{
                        textTransform: 'capitalize',
                        fontFamily: 'Jost, sans-serif',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#000',
                            color: '#fff',
                            borderColor: '#000',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onConfirm}
                    sx={{
                        textTransform: 'capitalize',
                        fontFamily: 'Jost, sans-serif',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#000',
                            color: '#fff',
                            borderColor: '#000',
                        },
                    }}
                >
                    Clear Cart
                </Button>
            </DialogActions>
        </Dialog>
    );
};
