import { extendTheme } from '@mui/material/styles';

import { setFont } from './styles/utils';
import { overridesTheme } from './overrides-theme';
import { shadows, typography, components, colorSchemes, customShadows } from './core';
import { updateCoreWithSettings, updateComponentsWithSettings } from './with-settings/update-theme';

// ----------------------------------------------------------------------

export function createTheme(localeComponents, settings) {
  const initialTheme = {
    colorSchemes,
    shadows: shadows(settings.colorScheme),
    customShadows: customShadows(settings.colorScheme),
    direction: settings.direction,
    shape: { borderRadius: 8 },
    components,
    typography: {
      ...typography,
      fontFamily: setFont(settings.fontFamily),
    },
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
    cssVariables: { disableCssColorScheme: true },
  };

  /**
   * 1.Update values from settings before creating theme.
   */
  const updateTheme = updateCoreWithSettings(initialTheme, settings);

  /**
   * 2.Create theme + add locale + update component with settings.
   */
  const theme = extendTheme(
    updateTheme,
    localeComponents,
    updateComponentsWithSettings(settings),
    overridesTheme
  );

  return theme;
}

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys, value) {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'breakpoints',
    'cssVarPrefix',
    'unstable_sxConfig',
    'typography',
    // 'transitions',
  ];

  const skipPaletteKeys = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}

/**
* createTheme without @settings and @locale components.
*
 ```jsx
export function createTheme(): Theme {
  const initialTheme = {
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    shape: { borderRadius: 8 },
    components,
    typography,
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme, overridesTheme);

  return theme;
}
 ```
*/
