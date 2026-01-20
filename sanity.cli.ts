import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '75e2zogt',
    dataset: 'production'
  },
  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
})
