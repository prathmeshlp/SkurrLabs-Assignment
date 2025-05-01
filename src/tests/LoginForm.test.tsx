import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import store from '../store/store';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

// Mock Firebase
jest.mock('../firebase/firebaseConfig', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <AuthProvider>{component}</AuthProvider>
    </Provider>
  );
};

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with all elements and responsive styling', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/simulated captcha/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toHaveClass('text-sm sm:text-base');
    expect(screen.getByText(/remember me/i)).toHaveClass('text-sm sm:text-base');
    expect(screen.getByText(/forgot password/i)).toHaveClass('text-sm sm:text-base');
  });

  test('displays error toast when CAPTCHA is not verified', () => {
    renderWithProviders(<LoginForm />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    expect(toast.error).toHaveBeenCalledWith('Please verify CAPTCHA before submitting the form.');
  });

  test('submits form, logs in successfully, and clears inputs/validations', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
    const captchaButton = screen.getByRole('button', { name: /verify/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberMeCheckbox);
    fireEvent.click(captchaButton);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(rememberMeCheckbox).not.toBeChecked();
      expect(captchaButton).toBeEnabled(); // CAPTCHA reset
    });
  });

  test('displays error toast on login failure', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const captchaButton = screen.getByRole('button', { name: /verify/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(captchaButton);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  test('shows loading spinner during login', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ user: { email: 'test@example.com' } }), 1000))
    );

    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const captchaButton = screen.getByRole('button', { name: /verify/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(captchaButton);
    fireEvent.click(loginButton);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  test('passes captchaVerified prop to Captcha component', () => {
    renderWithProviders(<LoginForm />);
    const captchaButton = screen.getByRole('button', { name: /verify/i });
    expect(captchaButton).toBeEnabled(); // Initially not verified
    fireEvent.click(captchaButton);
    expect(captchaButton).toBeDisabled(); // Verified, button disabled
  });
});