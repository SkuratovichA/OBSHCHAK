export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

export const COLORS = {
  background: (theme: ThemeType) => (theme === ThemeType.LIGHT ? '#EEEEEE' : '#4b4b4b'),

  text: (theme: ThemeType) =>
    theme === ThemeType.LIGHT
      ? {
          primary: '#3874CB',
          secondary: '#ffffff',
          tertiary: '#4b4b4b',
        }
      : {
          primary: '#f38e00',
          secondary: '#F8F0E5',
          tertiary: '#a8a8a8',
        },
}
