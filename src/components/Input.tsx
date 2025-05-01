import { InputProps } from '../types/types';

const Input: React.FC<InputProps> = ({ type, label, value, onChange, placeholder, required }) => {
  return (
    <div className="space-y-1">
      <label className="block text-white text-sm sm:text-base">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-1 sm:py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={label}
      />
    </div>
  );
};

export default Input;