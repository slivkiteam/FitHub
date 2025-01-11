import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Позволяет доступ к серверу из других хостов
    port: 80, // Убедитесь, что этот порт соответствует порту в docker-compose.yml
  },
  build: {
    outDir: 'dist', // Для финальной сборки (если нужно)
  },
});