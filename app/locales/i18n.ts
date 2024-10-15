// i18n.js
import { I18n } from 'i18n-js';
import * as SecureStore from 'expo-secure-store';
import { getLocales } from 'expo-localization';

import en from './en.json';
import zh from './zh.json';

const i18n = new I18n({
  en,
  zh,
});

i18n.enableFallback = true;



export { i18n };
