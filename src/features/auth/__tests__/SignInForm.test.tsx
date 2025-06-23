import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { authReducer } from '../model/slices/authSlice';
import { SignInForm } from '../ui/signin/SignInForm';

const PASSWORD = 'qazWSX123!@#';

vi.mock('../model/slices/authSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../model/slices/authSlice')>();
  return {
    ...actual,
    loginTC: vi.fn((data) => ({ type: 'loginTC', payload: data })),
  };
});

vi.mock('app/model/selectors/appSelectors', () => ({
  statusSelector: () => 'idle',
  errorSelector: () => null,
  isInitializedSelector: () => true,
}));

describe('SignInForm', () => {
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
    renderWithProviders(<SignInForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors on invalid input', async () => {
    renderWithProviders(<SignInForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    expect(submitButton).toBeDisabled();

    // Test email validation
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/The email address must be in the format user@domain.com/i)).toBeInTheDocument();
    });

    // Test password validation
    await userEvent.type(passwordInput, '123');
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility when icon clicked', async () => {
    renderWithProviders(<SignInForm />);

    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('dispatches loginTC with form data on valid submit', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderWithProviders(<SignInForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, PASSWORD);
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'loginTC',
        payload: {
          email: 'test@example.com',
          password: PASSWORD,
        },
      });
    });
  });
});