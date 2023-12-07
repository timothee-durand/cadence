import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

const wasmContentTypePlugin = {
  name: "wasm-content-type-plugin",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.endsWith(".wasm")) {
        res.setHeader("Content-Type", "application/wasm");
      }
      next();
    });
  },
};
 
export default defineConfig({
  base: process.env.APP_ENV === "production" ? '/cadence' : '/',
  plugins: [react(), wasmContentTypePlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['@swc/wasm-web']
  }
})
