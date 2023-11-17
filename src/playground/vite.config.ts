import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
 
export default defineConfig({
  base: process.env.APP_ENV === "production" ? '/cadence' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
