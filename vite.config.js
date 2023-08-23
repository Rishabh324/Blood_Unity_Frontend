import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config({ mode: "development" });

export default defineConfig({
  plugins: [react()],
});