import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/v1':'https://cooperative-erin-octopus.cyclic.app'
  //   }
  // },
  plugins: [react()],
})
