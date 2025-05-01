SkurrLabs Login Form Project
This project is a React-based login form application built with TypeScript, Redux, Firebase Authentication, and Tailwind CSS. It includes a simulated CAPTCHA component, responsive styling, and comprehensive unit tests using Jest and React Testing Library.
Features

Login Form: Email/password authentication with Firebase, remember-me checkbox, and CAPTCHA verification.
CAPTCHA Component: Memoized component with responsive styling (text-sm sm:text-base) and simplified state handling.
Responsive Design: Tailwind CSS for mobile-first styling.
State Management: Redux Toolkit for authentication state.
Testing: Unit tests for Button, Input, Captcha, and LoginForm components.

Prerequisites

Node.js: Version 18.x or higher.
npm: Version 8.x or higher.
Firebase Account: For authentication setup.
Git: For cloning the repository.

Setup Instructions
1. Clone the Repository
git clone <repository-url>
cd SkurrLabs

2. Install Dependencies
Install all required dependencies listed in package.json:
npm install

Ensure the following key dependencies are installed:
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.1.2",
    "@reduxjs/toolkit": "^2.2.7",
    "firebase": "^10.14.0",
    "react-hot-toast": "^2.4.1",
    "tailwindcss": "^3.4.13"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.2",
    "@testing-library/react": "^16.0.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.2.5",
    "typescript": "^5.6.2"
  }
}

3. Configure Firebase

Create a Firebase project at console.firebase.google.com.
Enable Email/Password authentication in the Firebase Authentication settings.
Copy your Firebase configuration and update src/firebase/firebaseConfig.ts:import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



4. Configure Tailwind CSS
Ensure tailwind.config.js is set up to process TypeScript and TSX files:
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

Run the Tailwind CSS build:
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

5. Resolve TypeScript Configuration Conflicts
The project uses tsconfig.json for development and tsconfig.test.json for tests. A common issue is a conflicting tsconfig.json in a parent directory (e.g., D:/Node Js Course 2025/) with an invalid reference.path option, causing the TS5024 error.
Check for Conflicting tsconfig.json Files
Search for tsconfig.json files in parent directories:
dir tsconfig.json /s

If found (e.g., D:\Node Js Course 2025\tsconfig.json), inspect for invalid options like:
{
  "compilerOptions": {
    "reference.path": "" // Invalid
  }
}

Rename or delete conflicting files:
ren "D:\Node Js Course 2025\tsconfig.json" tsconfig.json.bak

Verify Project tsconfig.json
Ensure tsconfig.json in the project root matches:
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

Verify tsconfig.test.json
Ensure tsconfig.test.json exists for Jest:
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "module": "commonjs",
    "esModuleInterop": true,
    "isolatedModules": true
  },
  "include": ["src/tests/**/*", "src/**/*.test.tsx", "src/**/*.test.ts"],
  "exclude": ["node_modules"]
}

6. Verify Jest Configuration
Ensure jest.config.js is configured to use tsconfig.test.json:
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }]
  }
};

Confirm jest.setup.ts enables Testing Library matchers:
import '@testing-library/jest-dom';

Ensure tests/__mocks__/fileMock.js exists for static assets:
module.exports = 'test-file-stub';

7. Run the Application
Start the development server:
npm start

The app will be available at http://localhost:3000.
8. Run Tests
Clear Jest cache to remove stale configurations:
npm test -- --clearCache

Run all tests:
npm test

Run specific test files:
npm test src/tests/Button.test.tsx
npm test src/tests/Input.test.tsx
npm test src/tests/Captcha.test.tsx
npm test src/tests/LoginForm.test.tsx

Test Coverage

Button.test.tsx: Tests rendering, disabled state, and type attribute.
Input.test.tsx: Tests rendering, input changes, and placeholder/required attributes.
Captcha.test.tsx: Tests responsive styling (text-sm sm:text-base), onVerify calls, verified state, memoization, and prop changes.
LoginForm.test.tsx: Tests form rendering, CAPTCHA verification, successful/failed logins, loading spinner, and captchaVerified prop passing.

Troubleshooting
TS5024: Compiler option 'reference.path' requires a value of type string

Cause: A conflicting tsconfig.json in a parent directory (e.g., D:/Node Js Course 2025/).
Fix:
Search for tsconfig.json:dir tsconfig.json /s


Rename conflicting files:ren "D:\Node Js Course 2025\tsconfig.json" tsconfig.json.bak


Move the project to a new directory to isolate it:mkdir D:\SkurrLabsTest
move D:\Node Js Course 2025\SkurrLabs D:\SkurrLabsTest\
cd D:\SkurrLabsTest\SkurrLabs
npm install
npm test





Test Failures

Firebase Mocks (in LoginForm.test.tsx):jest.mock('../firebase/firebaseConfig', () => ({ auth: {} }));
jest.mock('firebase/auth', () => ({ signInWithEmailAndPassword: jest.fn() }));


react-hot-toast Mocks:jest.mock('react-hot-toast', () => ({ success: jest.fn(), error: jest.fn() }));


Spinner: Ensure Spinner.tsx has:const Spinner = () => <div data-testid="spinner">Loading...</div>;
export default Spinner;



Module Not Found

Verify import paths (e.g., ../components/common/Button for Button.tsx).
Ensure components are in src/components/common/:
Button.tsx
Input.tsx
Captcha.tsx
LoginForm.tsx



Jest Environment Issues

Confirm jest-environment-jsdom is installed (^29.7.0).
Ensure jest.config.js has testEnvironment: 'jsdom'.

Project Structure
SkurrLabs/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Captcha.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── Spinner.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   ├── firebase/
│   │   ├── firebaseConfig.ts
│   ├── store/
│   │   ├── authSlice.ts
│   │   ├── store.ts
│   ├── tests/
│   │   ├── __mocks__/
│   │   │   ├── fileMock.js
│   │   ├── Button.test.tsx
│   │   ├── Input.test.tsx
│   │   ├── Captcha.test.tsx
│   │   ├── LoginForm.test.tsx
├── jest.config.js
├── jest.setup.ts
├── tsconfig.json
├── tsconfig.test.json
├── tailwind.config.js
├── package.json
├── README.md

Next Steps

Production CAPTCHA: Replace simulated CAPTCHA with Google reCAPTCHA.
Integration Tests: Use Firebase emulator for end-to-end authentication tests.
Additional Tests: Add LoginPage.test.tsx for page-level testing.
Deployment: Deploy to Vercel or Netlify.

For issues or contributions, please open an issue or submit a pull request on the repository.
