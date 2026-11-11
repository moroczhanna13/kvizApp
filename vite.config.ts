import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // A React és a MUI külön, jól gyorsítótárazható chunkba kerül
        codeSplitting: {
          groups: [
            { name: 'mui', test: /node_modules[/\\](@mui|@emotion)/ },
            { name: 'react', test: /node_modules[/\\](react|react-dom|scheduler)[/\\]/ },
          ],
        },
      },
    },
  },
})
