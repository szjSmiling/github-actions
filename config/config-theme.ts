import { defaultTheme } from '@vuepress/theme-default'
import { locales, themeLocales, themeLocalesCommon } from './config-locales.ts'

export const customTheme = () => {
  return {
    locales: locales,
    theme: defaultTheme({
      ...themeLocalesCommon,
      locales: themeLocales
    }),
    themePlugins: {
      backToTop: true
    }
  }
}
