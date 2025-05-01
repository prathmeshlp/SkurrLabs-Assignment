import { memo } from "react";

interface CaptchaProps {
  onVerify: () => void;
  captchaVerified: boolean;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify, captchaVerified }) => {
  return (
    <div className="space-y-2">
      <label className="block text-white font-medium text-sm sm:text-base">
        CAPTCHA
      </label>
      <div className="bg-gray-700 p-4 rounded-lg text-center">
        <p className="text-white mb-2 text-sm sm:text-base">
          Simulated CAPTCHA: Click to verify
        </p>
        <button
          type="button"
          onClick={onVerify}
          disabled={captchaVerified}
          className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm sm:text-base"
        >
          {captchaVerified ? "Verified" : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default memo(Captcha);
