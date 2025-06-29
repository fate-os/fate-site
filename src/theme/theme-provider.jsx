'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

import { createTheme } from './create-theme';
import { RTL } from './with-settings/right-to-left';
import { schemeConfig } from './color-scheme-script';

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const { currentLang } = useTranslate();

  const settings = useSettingsContext();

  const theme = createTheme(currentLang?.systemValue, settings);

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <MUIThemeProvider
        theme={theme}
        defaultMode={'light'}
        modeStorageKey={schemeConfig.modeStorageKey}
      >
        <CssBaseline />
        <RTL direction={settings.direction}>{children}</RTL>
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
