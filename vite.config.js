import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/v4' : 'https://api.football-data.org'
    }
  },
  plugins: [react()],

})  
