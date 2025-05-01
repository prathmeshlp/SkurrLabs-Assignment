# SkurrLabs Login Form Project

This project is a React-based login form application built with TypeScript, Redux, Firebase Authentication, Tailwind CSS, and Vite, using ES Modules (ESM). It includes a simulated CAPTCHA component and responsive styling for a seamless user experience.

## Features
- **Login Form**: Email/password authentication with Firebase, remember-me checkbox, and CAPTCHA verification.
- **CAPTCHA Component**: Memoized component with responsive styling (`text-sm sm:text-base`) and simplified state handling.
- **Responsive Design**: Tailwind CSS for mobile-first styling.
- **State Management**: Redux Toolkit for authentication state.
- **Build Tool**: Vite for fast development and production builds.
- **Module System**: ES Modules (`"type": "module"` in `package.json`).

## Prerequisites
- **Node.js**: Version 18.x or higher.
- **npm**: Version 8.x or higher.
- **Firebase Account**: For authentication setup.
- **Git**: For cloning the repository.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/prathmeshlp/SkurrLabs-Assignment
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
  "type": "module",
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
Ensure `tailwind.config.js` is set up to process TypeScript and TSX files using ESM syntax:
```javascript
export default {
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
The project uses `tsconfig.json` for development. A conflicting `tsconfig.json` in a parent directory (e.g., `D:/Node Js Course 2025/`) with an invalid `reference.path` option can cause Vite errors like `Cannot read properties of undefined (reading 'endsWith')`.

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

### 6. Configure Vite
Ensure `vite.config.ts` is ESM-compatible and explicitly references `tsconfig.json` to avoid configuration conflicts:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  esbuild: {
    tsconfigRaw: JSON.parse(await fs.readFile('./tsconfig.json', 'utf-8')),
  },
}));
```

### 7. Run the Application
Clear Vite cache to remove stale configurations:
```bash
rm -rf node_modules/.vite
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port specified by Vite).

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
  - Move the project to a new directory if needed:
    ```bash
    mkdir D:\SkurrLabsTest
    move D:\Node Js Course 2025\SkurrLabs D:\SkurrLabsTest\
    cd D:\SkurrLabsTest\SkurrLabs
    npm install
    npm run dev
    ```

#### Module Not Found
- Verify import paths (e.g., `../components/common/Button` for `Button.tsx`).
- Ensure components are in `src/components/common/`:
  - `Button.tsx`
  - `Input.tsx`
  - `Captcha.tsx`
  - `LoginForm.tsx`
  - `Spinner.tsx`

#### Firebase Configuration Issues
- Ensure `src/firebase/firebaseConfig.ts` has valid Firebase credentials.
- Verify Email/Password authentication is enabled in Firebase.

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
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── README.md
```

<!-- ### Next Steps
- **Production CAPTCHA**: Replace simulated CAPTCHA with Google reCAPTCHA.
- **Deployment**: Deploy to Vercel or Netlify.
- **Authentication Enhancements**: Add password reset and signup functionality. -->

For issues or contributions, please open an issue or submit a pull request on the repository.