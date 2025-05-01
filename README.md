# SkurrLabs Login Form Project

This project is a React-based login form application built with TypeScript, Redux, Firebase Authentication, Tailwind CSS, and Vite. It includes a simulated CAPTCHA component, responsive styling, and comprehensive unit tests using Jest and React Testing Library.

## Features
- **Login Form**: Email/password authentication with Firebase, remember-me checkbox, and CAPTCHA verification.
- **CAPTCHA Component**: Memoized component with responsive styling (`text-sm sm:text-base`) and simplified state handling.
- **Responsive Design**: Tailwind CSS for mobile-first styling.
- **State Management**: Redux Toolkit for authentication state.
- **Testing**: Unit tests for `Button`, `Input`, `Captcha`, and `LoginForm` components.
- **Build Tool**: Vite for fast development and production builds.

## Prerequisites
- **Node.js**: Version 18.x or higher.
- **npm**: Version 8.x or higher.
- **Firebase Account**: For authentication setup.
- **Git**: For cloning the repository.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/prathmeshlp/SkurrLabs-Assignment>
cd SkurrLabs
```

### 2. Install Dependencies
Install all required dependencies listed in `package.json`:
```bash
npm install
```

Ensure the following key dependencies are installed:
```json
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
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "@vitejs/plugin-react": "^4.3.2"
  }
}
```

### 3. Configure Firebase
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable Email/Password authentication in the Firebase Authentication settings.
3. Copy your Firebase configuration and update `src/firebase/firebaseConfig.ts`:
   ```typescript
   import { initializeApp } from 'firebase/app';
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
   ```

### 4. Configure Tailwind CSS
Ensure `tailwind.config.js` is set up to process TypeScript and TSX files:
```javascript
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

Run the Tailwind CSS build:
```bash
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

### 5. Resolve TypeScript Configuration Conflicts
The project uses `tsconfig.json` for development and `tsconfig.test.json` for tests. A common issue is a conflicting `tsconfig.json` in a parent directory (e.g., `D:/Node Js Course 2025/`) with an invalid `reference.path` option, causing errors like `TS5024` in Jest or `Cannot read properties of undefined (reading 'endsWith')` in Vite.

#### Check for Conflicting `tsconfig.json` Files
Search for `tsconfig.json` files in parent directories:
```bash
dir tsconfig.json /s
```

If found (e.g., `D:\Node Js Course 2025\tsconfig.json`), inspect for invalid options like:
```json
{
  "compilerOptions": {
    "reference.path": "" // Invalid
  }
}
```

Rename or delete conflicting files:
```bash
ren "D:\Node Js Course 2025\tsconfig.json" tsconfig.json.bak
```

If multiple files exist, repeat for each (e.g., `D:\Node Js Course 2025\other\tsconfig.json`).

#### Isolate Project (Optional)
If conflicts persist, move the project to a new directory:
```bash
mkdir D:\SkurrLabsTest
move D:\Node Js Course 2025\SkurrLabs D:\SkurrLabsTest\
cd D:\SkurrLabsTest\SkurrLabs
npm install
```

#### Verify Project `tsconfig.json`
Ensure `tsconfig.json` in the project root matches:
```json
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
```

#### Verify `tsconfig.test.json`
Ensure `tsconfig.test.json` exists for Jest:
```json
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
```

### 6. Configure Vite
Ensure `vite.config.ts` explicitly references `tsconfig.json` to avoid configuration conflicts:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    tsconfigRaw: require('./tsconfig.json'), // Explicitly load project's tsconfig.json
  },
});
```

### 7. Verify Jest Configuration
Ensure `jest.config.js` is configured to use `tsconfig.test.json`:
```javascript
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
```

Confirm `jest.setup.ts` enables Testing Library matchers:
```typescript
import '@testing-library/jest-dom';
```

Ensure `tests/__mocks__/fileMock.js` exists for static assets:
```javascript
module.exports = 'test-file-stub';
```

### 8. Run the Application
Clear Vite cache to remove stale configurations:
```bash
rm -rf node_modules/.vite
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port specified by Vite).

### 9. Run Tests
Clear Jest cache to remove stale configurations:
```bash
npm test -- --clearCache
```

Run all tests:
```bash
npm test
```

Run specific test files:
```bash
npm test src/tests/Button.test.tsx
npm test src/tests/Input.test.tsx
npm test src/tests/Captcha.test.tsx
npm test src/tests/LoginForm.test.tsx
```

#### Test Coverage
- **Button.test.tsx**: Tests rendering, disabled state, and type attribute.
- **Input.test.tsx**: Tests rendering, input changes, and placeholder/required attributes.
- **Captcha.test.tsx**: Tests responsive styling (`text-sm sm:text-base`), `onVerify` calls, verified state, memoization, and prop changes.
- **LoginForm.test.tsx**: Tests form rendering, CAPTCHA verification, successful/failed logins, loading spinner, and `captchaVerified` prop passing.

### Troubleshooting

#### Vite Error: Cannot read properties of undefined (reading 'endsWith')
- **Cause**: A conflicting `tsconfig.json` in a parent directory with an invalid `reference.path`.
- **Fix**:
  - Search for `tsconfig.json`:
    ```bash
    dir tsconfig.json /s
    ```
  - Rename conflicting files:
    ```bash
    ren "D:\Node Js Course 2025\tsconfig.json" tsconfig.json.bak
    ```
  - Clear Vite cache:
    ```bash
    rm -rf node_modules/.vite
    ```
  - Restart Vite:
    ```bash
    npm run dev
    ```

#### TS5024: Compiler option 'reference.path' requires a value of type string (Jest)
- **Cause**: A conflicting `tsconfig.json` in a parent directory.
- **Fix**:
  - Search for `tsconfig.json`:
    ```bash
    dir tsconfig.json /s
    ```
  - Rename conflicting files:
    ```bash
    ren "D:\Node Js Course 2025\tsconfig.json" tsconfig.json.bak
    ```
  - Clear Jest cache:
    ```bash
    npm test -- --clearCache
    ```
  - Move the project to a new directory if needed:
    ```bash
    mkdir D:\SkurrLabsTest
    move D:\Node Js Course 2025\SkurrLabs D:\SkurrLabsTest\
    cd D:\SkurrLabsTest\SkurrLabs
    npm install
    npm test
    ```

#### Test Failures
- **Firebase Mocks** (in `LoginForm.test.tsx`):
  ```javascript
  jest.mock('../firebase/firebaseConfig', () => ({ auth: {} }));
  jest.mock('firebase/auth', () => ({ signInWithEmailAndPassword: jest.fn() }));
  ```
- **react-hot-toast Mocks**:
  ```javascript
  jest.mock('react-hot-toast', () => ({ success: jest.fn(), error: jest.fn() }));
  ```
- **Spinner**: Ensure `Spinner.tsx` has:
  ```tsx
  const Spinner = () => <div data-testid="spinner">Loading...</div>;
  export default Spinner;
  ```

#### Module Not Found
- Verify import paths (e.g., `../components/common/Button` for `Button.tsx`).
- Ensure components are in `src/components/common/`:
  - `Button.tsx`
  - `Input.tsx`
  - `Captcha.tsx`
  - `LoginForm.tsx`
  - `Spinner.tsx`

#### Jest Environment Issues
- Confirm `jest-environment-jsdom` is installed (`^29.7.0`).
- Ensure `jest.config.js` has `testEnvironment: 'jsdom'`.

### Project Structure
```
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
├── vite.config.ts
├── tailwind.config.js
├── package.json
├── README.md
```

### Next Steps
- **Production CAPTCHA**: Replace simulated CAPTCHA with Google reCAPTCHA.
- **Integration Tests**: Use Firebase emulator for end-to-end authentication tests.
- **Additional Tests**: Add `LoginPage.test.tsx` for page-level testing.
- **Deployment**: Deploy to Vercel or Netlify.

For issues or contributions, please open an issue or submit a pull request on the repository.