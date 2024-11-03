/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/components/halfScreen.modal` | `/components/manageTimeSlot.modal` | `/config/config` | `/constants/AirCarerText` | `/constants/Colors` | `/constants/theme` | `/contexts/SkillsContext` | `/contexts/font.context` | `/contexts/language.context` | `/hooks/useAxios` | `/hooks/useColorScheme` | `/hooks/useThemeColor` | `/locales/i18n` | `/navigation` | `/screens/account` | `/screens/account/EditPublicProfileScreen` | `/screens/account/VerificationScreen` | `/screens/browsing-task` | `/screens/browsing-task/taskDetail` | `/screens/login` | `/screens/my-task` | `/screens/my-task/myTaskDetail` | `/screens/property/addProperty` | `/screens/property/addPropertyPhotos` | `/screens/property/propertyList` | `/screens/publish-task` | `/screens/signup/signupPricing` | `/screens/signup/signupServicingHours` | `/screens/skills/EducationScreen` | `/screens/skills/LanguagesScreen` | `/screens/skills/SkillsSettingsScreen` | `/screens/skills/SpecialtiesScreen` | `/screens/skills/TransportationScreen` | `/screens/skills/WorkScreen` | `/slices/aircarer.slice` | `/store` | `/store/rootReducer` | `/types/DayOfWeek.enum` | `/types/common.type` | `/types/timeSlot.type` | `/screens/signup/createProfile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
