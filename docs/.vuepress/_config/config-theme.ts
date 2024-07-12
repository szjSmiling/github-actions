import { defaultTheme } from 'vuepress'
import { locales, themeLocales, themeLocalesCommon } from './config-locales'

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
