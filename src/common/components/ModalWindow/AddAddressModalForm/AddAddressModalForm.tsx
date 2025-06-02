import type { FC } from 'react';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addAddressModalForm';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { COUNTRIES } from '../../../validations/validation-data/validation-data';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AddressModalFormData } from '../../../validations/addressModalFormValidation';
import { validateAddressModalFormSchema } from '../../../validations/addressModalFormValidation';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import { useAppSelector } from '../../../hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import { AddressModalType } from '../../../enums';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export type AddAddressModalFormProps = {
    modalType: AddressModalType | null;
    closeModalCB: () => void;
    addAddressCB: (address?: AddressModalFormData, addressId?: string) => void;
};

export const AddAddressModalForm: FC<AddAddressModalFormProps> = ({ modalType, closeModalCB, addAddressCB }) => {
    const appStatus: string = useAppSelector<Status>(statusSelector);

    const title: string = modalType === AddressModalType.BILLING ? 'Billing Address' : 'Shipping Address';

    const {
        register,
        handleSubmit,
        // reset,
        control,
        formState: { errors, isValid },
        // setValue,
        // getValues,
    } = useForm({
        // useForm<SignUpFormData>({
        mode: 'all',
        resolver: yupResolver(validateAddressModalFormSchema()),
        defaultValues: {
            country: '',
            isDefaultShippingAddress: false,
            isDefaultBillingAddress: false,
        },
    });

    const onSubmit: SubmitHandler<AddressModalFormData> = data => {
        const newAddress: AddressModalFormData = {
            street: data.street,
            city: data.city,
            postal: data.postal,
            country: data.country,

            isDefaultShippingAddress: data.isDefaultShippingAddress,
            isDefaultBillingAddress: data.isDefaultBillingAddress,
        };

        addAddressCB(newAddress);
    };

    const selectedCountry = useWatch({
        control,
        name: 'country',
    });

    return (
        <Box sx={STYLES.addressModal}>
            <Typography variant="h2" component="h2" sx={STYLES.modalTitle}>
                {title}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormGroup sx={STYLES.modalForm}>
                    <FormControl fullWidth>
                        <TextField
                            label="Street"
                            type="text"
                            fullWidth
                            id="street"
                            sx={{
                                ...STYLES.addressInput,
                                ...STYLES.addressInputMedia,
                                ...STYLES.autofillInput,
                            }}
                            error={!!errors.street}
                            variant="filled"
                            {...register('street')}
                            autoComplete="street-address"
                            size="small"
                        />
                        {errors.street && (
                            <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                {errors.street.message}
                            </Typography>
                        )}
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label="City"
                            type="text"
                            fullWidth
                            id="city"
                            sx={{
                                ...STYLES.addressInput,
                                ...STYLES.addressInputMedia,
                                ...STYLES.autofillInput,
                            }}
                            error={!!errors.city}
                            variant="filled"
                            {...register('city')}
                            autoComplete="address-level2"
                            size="small"
                        />
                        {errors.city && (
                            <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                {errors.city.message}
                            </Typography>
                        )}
                    </FormControl>

                    <FormControl fullWidth variant="filled">
                        <InputLabel id="country-label" sx={STYLES.countryLabel}>
                            Country
                        </InputLabel>
                        <Select
                            labelId="country-label"
                            id="country"
                            label="Country"
                            sx={{
                                ...STYLES.addressInput,
                                ...STYLES.countryInput,
                                ...STYLES.addressInputMedia,
                            }}
                            error={!!errors.country}
                            {...register('country')}
                            size="small"
                            value={selectedCountry ?? ''}
                        >
                            {COUNTRIES.map(country => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.country && (
                            <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                {errors.country.message}
                            </Typography>
                        )}
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={selectedCountry ? 'Postal code' : 'Select a country first'}
                            type="text"
                            fullWidth
                            id="postal"
                            sx={{
                                ...STYLES.addressInput,
                                ...STYLES.addressInputMedia,
                            }}
                            error={!!errors.postal}
                            variant="filled"
                            {...register('postal')}
                            autoComplete="postal-code"
                            size="small"
                            disabled={!selectedCountry}
                        />
                        {errors.postal && (
                            <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                {errors.postal.message}
                            </Typography>
                        )}
                    </FormControl>

                    {modalType === AddressModalType.BILLING ? (
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        id="defaultBillingAddress"
                                        {...register('isDefaultBillingAddress')}
                                    />
                                }
                                label="Set address as default for billing"
                                sx={STYLES.defaultBillingAddressCheckbox}
                            />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        id="defaultShippingAddress"
                                        {...register('isDefaultShippingAddress')}
                                    />
                                }
                                label="Set address as default for shipping"
                                sx={STYLES.defaultShippingAddressCheckbox}
                            />
                        </FormGroup>
                    )}

                    <Box sx={STYLES.modalControls}>
                        <Button
                            onClick={closeModalCB}
                            color="primary"
                            type="button"
                            sx={{
                                ...STYLES.modalButton,
                                ...STYLES.modalCancelButton,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={closeModalCB}
                            color="primary"
                            type="submit"
                            disabled={!isValid || appStatus === 'loading'}
                            sx={{
                                ...STYLES.modalButton,
                                ...STYLES.modalAddAddressButton,
                            }}
                        >
                            Add address
                        </Button>
                    </Box>
                </FormGroup>
            </Box>
        </Box>
    );
};
