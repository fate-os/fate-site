import 'src/global.css';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';
import { schemeConfig } from 'src/theme/color-scheme-script';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';

import AppProvider from '@/store/providers/AppProvider';
import { ClientApolloProvider } from '@/store/providers/ApolloWrapper';

// ----------------------------------------------------------------------

const title = 'Fate Os | Discover the Fate of a Human Based on Name and Birthday';
const description =
  'Fate Os helps you uncover the destiny of a person based on their name and birthday date. Explore insights and predictions to understand the journey of life better.';
const image = '/assets/fateos_thumb.jpg';

export const metadata = {
  title: title,
  description: description,
  icons: '/favicon.ico',
  metadataBase: new URL(CONFIG.site.assetURL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'fate analysis',
    'name-based destiny',
    'birthday predictions',
    'life journey',
    'human fate',
    'Fate Os',
    'destiny insights',
    'life predictions',
    'name and birthday analysis',
  ],
  author: 'Fate Os Team',
  openGraph: {
    title: title,
    description: description,
    url: CONFIG.site.assetURL,
    type: 'website',

    siteName: 'Fate Os',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [image],
    creator: 'Fate Os',
    site: '@FateOs',
  },

  alternates: {
    canonical: CONFIG.site.assetURL,
  },
};

const AuthProvider = JwtAuthProvider;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export default async function RootLayout({ children }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <head>
        {/* Canonical URL for SEO */}
        <link rel="canonical" href={CONFIG.site.assetURL} />
      </head>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        ></InitColorSchemeScript>

        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <ClientApolloProvider>
            <AppProvider>
              <LocalizationProvider>
                <AuthProvider>
                  <SettingsProvider
                    settings={settings}
                    caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
                  >
                    <ThemeProvider>
                      <MotionLazy>
                        <Snackbar />
                        <ProgressBar />

                        {children}
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </AuthProvider>
              </LocalizationProvider>
            </AppProvider>
          </ClientApolloProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
