import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input';

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input type="text" label="Username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input type="text" label="Username" value="" onChange={handleChange} />);
    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('displays placeholder text', () => {
    render(
      <Input
        type="text"
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter username"
      />
    );
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });
});