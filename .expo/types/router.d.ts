/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/config/config` | `/constants/AirCarerText` | `/constants/Colors` | `/constants/theme` | `/contexts/font.context` | `/contexts/language.context` | `/hooks/useAxios` | `/hooks/useColorScheme` | `/hooks/useThemeColor` | `/locales/i18n` | `/navigation` | `/screens/account` | `/screens/browsing-task` | `/screens/browsing-task/taskDetail` | `/screens/my-task` | `/screens/my-task/myTaskDetail` | `/screens/publish-task` | `/slices/aircarer.slice` | `/store` | `/store/rootReducer` | `/types/common.type`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
