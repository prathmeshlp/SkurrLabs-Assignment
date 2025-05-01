import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
        role="main"
      >
        <img src={"https://skurelabs.com/wp-content/uploads/2024/11/Skurelabs.png"} alt="SkureLabs Logo" className="mx-auto h-12 mb-6" />
        <h1 className="text-base sm:text-2xl font-bold text-white text-center mb-6">SkureLabs Secure Login</h1>
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;