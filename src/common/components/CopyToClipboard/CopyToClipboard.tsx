import type { FC } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { successNotifyMessage } from '../../utils/notify-message';
import { STYLES } from './styles.copyToClipboard';

type CopyToClipboardProps = {
    value: string | undefined;
};

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ value }) => {
    const handleCopy = () => {
        if (value) {
            navigator.clipboard
                .writeText(value)
                .then(() => {
                    successNotifyMessage(`Copied to clipboard: ${value}`);
                })
                .catch((error: unknown) => {
                    const error_ =
                        error instanceof Error
                            ? new Error(`Failed to copy: ${error.message}`)
                            : new Error(`Failed to copy: Unknown Error occurred`);
                    throw error_;
                });
        }
    };

    return (
        <IconButton onClick={handleCopy} aria-label="copy">
            <ContentCopyIcon sx={STYLES.icon} />
        </IconButton>
    );
};
