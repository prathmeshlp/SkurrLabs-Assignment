import { ButtonProps } from '../types/types';

const Button: React.FC<ButtonProps> = ({ children, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2
       focus:ring-green-400 disabled:opacity-50 text-sm sm:text-base"
    >
      {children}
    </button>
  );
};

export default Button;