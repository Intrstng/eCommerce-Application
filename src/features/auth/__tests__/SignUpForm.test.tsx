import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { authReducer } from '../model/slices/authSlice';
import { SignUpForm } from '../ui/signup/SignUpForm';

const PASSWORD = 'qazWSX123!@#';

vi.mock('../model/slices/authSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../model/slices/authSlice')>();
  return {
    ...actual,
    signUpTC: vi.fn((data) => ({ type: 'signUpTC', payload: data })),
  };
});

vi.mock('app/model/selectors/appSelectors', () => ({
  statusSelector: () => 'idle',
  errorSelector: () => null,
  isInitializedSelector: () => true,
}));

describe('SignUpForm', () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        auth: authReducer,
        app: () => ({ status: 'idle', error: null, isInitialized: true }),
      },
    });
  };

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter>
          <Provider store={store}>
            {ui}
          </Provider>
        </MemoryRouter>
    );
  };

  it('renders form fields and button', () => {
    renderWithProviders(<SignUpForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByTestId('birth-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('street-billing-input')).toBeInTheDocument();
    expect(screen.getByTestId('city-billing-input')).toBeInTheDocument();
    expect(screen.getByTestId('country-billing-input')).toBeInTheDocument();
    expect(screen.getByTestId('postal-billing-input')).toBeInTheDocument();

    expect(screen.getByLabelText('Set address as default for shipping')).toBeInTheDocument();
    expect(screen.getByLabelText('Set shipping address as billing')).toBeInTheDocument();
    expect(screen.getByLabelText('Set address as default for billing')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation errors on invalid input', async () => {
    renderWithProviders(<SignUpForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const firstNameInput = screen.getByLabelText('First name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const birthDateInput = screen.getByTestId('birth-date-input');

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    expect(submitButton).toBeDisabled();

    // Test email validation
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Email must contain a domain name/i)).toBeInTheDocument();
    });

    // Test password validation
    await userEvent.type(passwordInput, '123');
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Password must contain at least one capital Latin letter/i)).toBeInTheDocument();
    });

    // Test confirm password validation
    await userEvent.type(confirmPasswordInput, 'differentPassword');
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    // Test first name validation
    await userEvent.type(firstNameInput, '!1');
    fireEvent.blur(firstNameInput);

    await waitFor(() => {
      expect(screen.getByText(/First name must contain at least one character and not contain special characters or digits/i)).toBeInTheDocument();
    });

    // Test last name validation
    await userEvent.type(lastNameInput, '!1');
    fireEvent.blur(lastNameInput);

    await waitFor(() => {
      expect(screen.getByText(/Last name must contain at least one character and not contain special characters or digits/i)).toBeInTheDocument();
    });
  });

  it.skip('dispatches signUpTC with form data on valid submit', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderWithProviders(<SignUpForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const firstNameInput = screen.getByLabelText('First name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const birthDateInput = screen.getByTestId('birth-date-input');

    const shippingStreetInput = screen.getByTestId('street-shipping-input');
    const shippingCityInput = screen.getByTestId('city-shipping-input');
    const shippingCountryInput = screen.getByTestId('country-shipping-input');
    const shippingPostalInput = screen.getByTestId('postal-shipping-input');

    const billingStreetInput = screen.getByTestId('street-billing-input');
    const billingCityInput = screen.getByTestId('city-billing-input');
    const billingCountryInput = screen.getByTestId('country-billing-input');
    const billingPostalInput = screen.getByTestId('postal-billing-input');

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, PASSWORD);
    await userEvent.type(confirmPasswordInput, PASSWORD);
    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });
    fireEvent.blur(birthDateInput);

    await userEvent.type(shippingStreetInput, 'Kirova');
    await userEvent.type(shippingCityInput, 'Minsk');

    await userEvent.selectOptions(shippingCountryInput, 'BY');
    await userEvent.type(shippingPostalInput, '220000');

    await userEvent.type(billingStreetInput, 'Kirova');
    await userEvent.type(billingCityInput, 'Minsk');

    await userEvent.selectOptions(billingCountryInput, 'BY');
    await userEvent.type(billingPostalInput, '220000');

    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'signUpTC',
        payload: {
          email: 'test@example.com',
          password: PASSWORD,
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '2000-01-01',
          addresses: [{
            country: 'BY',
            streetName: 'Kirova',
            postalCode: '220000',
            city: 'Minsk',
          },
          ],
          defaultShippingAddress: 0,
          defaultBillingAddress: 0,
          shippingAddresses: [0],
          billingAddresses: [0],
        },
      });
    });
  });
});