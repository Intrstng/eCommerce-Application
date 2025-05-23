import { useState } from 'react';
import { authAPI } from 'src/features/auth/api/authApi';
import { Button } from 'src/common/components/Button/Button';

interface ChangePasswordFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const ChangePasswordForm = ({ onClose, onSuccess }: ChangePasswordFormProps) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePassword = (password: string): boolean => {
        const requirements = [
            { test: password.length >= 8, message: 'Must be at least 8 characters' },
            { test: /\d/.test(password), message: 'Must contain a number' },
            { test: /[A-Z]/.test(password), message: 'Must contain an uppercase letter' },
            { test: /[a-z]/.test(password), message: 'Must contain a lowercase letter' },
            { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Must contain a special character' },
        ];

        const failedRequirement = requirements.find(request => !request.test);
        if (failedRequirement) {
            setValidationError(failedRequirement.message);
            return false;
        }
        return true;
    };

    const handleFormSubmit = async (submitEvent: React.FormEvent) => {
        submitEvent.preventDefault();
        setValidationError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        if (formData.newPassword === formData.currentPassword) {
            setValidationError('New password must be different');
            return;
        }

        if (!validatePassword(formData.newPassword)) return;

        setIsSubmitting(true);

        try {
            await authAPI.changePassword(formData.currentPassword, formData.newPassword);
            onSuccess();
        } catch (apiError) {
            setValidationError(
                apiError instanceof Error ? apiError.message : 'Password change failed. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof typeof formData) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(previous => ({ ...previous, [field]: changeEvent.target.value }));
    };

    return (
        <div className="password-form">
            <h3>Change Password</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange('currentPassword')}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange('newPassword')}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        required
                    />
                </div>

                {validationError && <div className="error">{validationError}</div>}

                <div className="requirements">
                    <p>Password requirements:</p>
                    <ul>
                        <li>Minimum 8 characters</li>
                        <li>At least one number</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one special character</li>
                    </ul>
                </div>

                <div className="form-actions">
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Change Password'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
