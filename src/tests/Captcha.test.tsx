import { render, screen, fireEvent } from '@testing-library/react';
import Captcha from '../components/Captcha';

describe('Captcha Component', () => {
  test('renders CAPTCHA component with responsive styling', () => {
    const onVerify = jest.fn();
    render(<Captcha onVerify={onVerify} captchaVerified={false} />);
    expect(screen.getByText(/simulated captcha/i)).toBeInTheDocument();
    expect(screen.getByText(/captcha/i)).toHaveClass('text-sm sm:text-base'); // Label
    expect(screen.getByText(/simulated captcha/i)).toHaveClass('text-sm sm:text-base'); // Text
    expect(screen.getByRole('button', { name: /verify/i })).toHaveClass('text-sm sm:text-base'); // Button
  });

  test('calls onVerify when verify button is clicked', () => {
    const onVerify = jest.fn();
    render(<Captcha onVerify={onVerify} captchaVerified={false} />);
    const verifyButton = screen.getByRole('button', { name: /verify/i });
    fireEvent.click(verifyButton);
    expect(onVerify).toHaveBeenCalled();
  });

  test('disables button and shows "Verified" when captchaVerified is true', () => {
    const onVerify = jest.fn();
    render(<Captcha onVerify={onVerify} captchaVerified={true} />);
    const verifyButton = screen.getByRole('button', { name: /verified/i });
    expect(verifyButton).toBeDisabled();
    expect(verifyButton).toHaveTextContent('Verified');
    fireEvent.click(verifyButton);
    expect(onVerify).not.toHaveBeenCalled();
  });

  test('memo prevents re-render when props are unchanged', () => {
    const onVerify = jest.fn();
    const renderSpy = jest.fn();
    jest.mock('../components/Captcha', () => {
      const OriginalCaptcha = jest.requireActual('../components/Captcha').default;
      return (props: any) => {
        renderSpy();
        return <OriginalCaptcha {...props} />;
      };
    });
    const { rerender } = render(<Captcha onVerify={onVerify} captchaVerified={false} />);
    rerender(<Captcha onVerify={onVerify} captchaVerified={false} />);
    expect(renderSpy).toHaveBeenCalledTimes(1); // Only renders once due to memo
    renderSpy.mockRestore();
  });

  test('re-renders when captchaVerified prop changes', () => {
    const onVerify = jest.fn();
    const renderSpy = jest.fn();
    jest.mock('../components/Captcha', () => {
      const OriginalCaptcha = jest.requireActual('../components/Captcha').default;
      return (props: any) => {
        renderSpy();
        return <OriginalCaptcha {...props} />;
      };
    });
    const { rerender } = render(<Captcha onVerify={onVerify} captchaVerified={false} />);
    rerender(<Captcha onVerify={onVerify} captchaVerified={true} />);
    expect(renderSpy).toHaveBeenCalledTimes(2); // Renders again due to prop change
  });
});

// Mock memo to allow spying on render
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (component: any) => {
    component.render = jest.fn().mockImplementation(component);
    return component;
  },
}));