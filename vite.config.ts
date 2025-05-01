import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  esbuild: {
    tsconfigRaw:JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8')), // Explicitly load project's tsconfig.json
  },
})
