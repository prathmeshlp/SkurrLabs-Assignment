import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";
import Captcha from "./Captcha";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  console.log(captchaVerified);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { setAuth } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify CAPTCHA before submitting the form.");
      return;
    }
    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        setAuth({ email: result.payload.email, rememberMe });
        toast.success("Login successful!");
        setEmail('');
        setPassword('');
        setRememberMe(false);
        setCaptchaVerified(false);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        aria-required="true"
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        aria-required="true"
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center text-white text-sm sm:text-base">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Remember Me
        </label>
        <a
          href="/forgot-password"
          className="text-green-400 hover:underline text-sm sm:text-base"
        >
          Forgot Password?
        </a>
      </div>
      <Captcha onVerify={() => setCaptchaVerified(true)} captchaVerified={captchaVerified} />
      {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
      <Button type="submit" disabled={loading || !captchaVerified}>
        {loading ? <Spinner /> : "Login"}
      </Button>
      <p className="text-center text-white text-sm sm:text-base">
        Don't have an account?{" "}
        <a href="/signup" className="text-green-400 hover:underline">
          Sign Up
        </a>
      </p>
    </motion.form>
  );
};

export default LoginForm;
