import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Login";
import store from "./store/store";
import "./index.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center">
      <Toaster position="top-center"/>
      <Provider store={store}>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
