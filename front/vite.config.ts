import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {

    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 2600,
      sourcemap: false
    },
    // vite config
    define: {
      GIS_HOME: JSON.stringify(env.APP_ENV),
      isDev : process.env.NODE_ENV === "development"
    },
    base: process.env.NODE_ENV === "development" ? "/gisNew/" : "/gisNew/static/"
  }
})