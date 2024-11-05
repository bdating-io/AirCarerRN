import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth0 } from 'react-native-auth0';
import { Icon } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Screens
import BrowsingTaskScreen from "@app/screens/browsing-task";
import PublishTaskScreen from "@app/screens/publish-task";
import PublishTaskDateScreen from "@app/screens/publish-task/publishTaskDate";
import PublishTaskPropertyDetailsScreen from "@app/screens/publish-task/publishTaskPropertyDetails";
import PublishTaskPhotosScreen from "@app/screens/publish-task/publishTaskPhotos";
import PublishTaskBudgetScreen from "@app/screens/publish-task/publishTaskBudget";
import PublishTaskPostScreen from "@app/screens/publish-task/publishTaskPost"; // Added publishTaskPost screen import
import MyTaskScreen from "@app/screens/my-task";
import AccountScreen from "@app/screens/account";
import LoginScreen from "@app/screens/login";
import MyTaskDetailScreen from "@app/screens/my-task/myTaskDetail";
import TaskConclusionScreen from "@app/screens/browsing-task/taskConclusion";
import TaskDetailScreen from "@app/screens/browsing-task/taskDetail";
import SignupPricing from "@app/screens/signup/signupPricing";
import SignupServicingHours from "@app/screens/signup/signupServicingHours";
import AirCarerText from "@app/constants/AirCarerText";
import CreateProfile from "@app/screens/signup/createProfile";

import PropertyList from "@app/screens/property/propertyList";
import AddProperty from "@app/screens/property/addProperty";
import AddPropertyPhotos from "@app/screens/property/addPropertyPhotos";

import EditPublicProfileScreen from "@app/screens/account/EditPublicProfileScreen";
import SkillsSettingsScreen from "@app/screens/skills/SkillsSettingsScreen";
import TransportationScreen from "@app/screens/skills/TransportationScreen";
import LanguagesScreen from "@app/screens/skills/LanguagesScreen";
import EducationScreen from "@app/screens/skills/EducationScreen";
import WorkScreen from "@app/screens/skills/WorkScreen";
import SpecialtiesScreen from "@app/screens/skills/SpecialtiesScreen";
import VerificationScreen from "@app/screens/account/VerificationScreen";

import { SkillsProvider } from "@app/contexts/SkillsContext";
import { RootStackParamList } from "@app/types/common.type";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";

import Logo from "@assets/images/logo.png";
import { useLanguage } from "@app/contexts/language.context";
import AppSetting from '@app/screens/account/setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const { user, isLoading } = useAuth0();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { lang } = useLanguage();

    useEffect(() => {
        console.log('isLoading', isLoading);
        if (!isLoading && !user) {
            // navigation.navigate('login');
            // console.log('Not logged in, redirect to login');
        }
    }, [isLoading, user]);

    const renderTabIcon = (route: any, focused: boolean) => {
        let icon = '';
        switch (route.name) {
            case 'PublishTaskScreen': icon = 'check-circle-outline'; break;
            case 'BrowsingTaskScreen': icon = 'magnify'; break;
            case 'MyTaskScreen': icon = 'clipboard-text-outline'; break;
            case 'Account': icon = 'account-circle-outline'; break;
        }
        return <Icon source={`${icon}`} color={focused ? theme.colors.secondary : theme.colors.primary} size={24} />;
    };

    const RenderTabNavigation = useCallback(() => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarIcon: ({ focused }) => renderTabIcon(route, focused),
                    tabBarInactiveTintColor: theme.colors.primary,
                    tabBarActiveTintColor: theme.colors.secondary,
                    headerTitleAlign: 'center',
                    headerTitle: () => <Image source={Logo} style={{ width: 240, height: 45 }} />
                })}
            >
                <Tab.Screen name='PublishTaskScreen' component={PublishTaskScreen} options={{ tabBarLabel: i18n.t('publishTask') }} />
                <Tab.Screen name='BrowsingTaskScreen' component={BrowsingTaskScreen} options={{
                    headerTitle: () => <AirCarerText variant='bold'>{i18n.t('browsingTasks')}</AirCarerText>,
                    tabBarLabel: i18n.t('browsingTasks')
                }} />
                <Tab.Screen name='MyTaskScreen' component={MyTaskScreen} options={{
                    headerTitle: () => <AirCarerText variant='bold'>{i18n.t('myTasks')}</AirCarerText>,
                    tabBarLabel: i18n.t('myTasks')
                }} />
                <Tab.Screen name='Account' component={AccountScreen} options={{
                    headerTitle: () => <AirCarerText variant='bold'>{i18n.t('account')}</AirCarerText>,
                    tabBarLabel: i18n.t('account')
                }} />
            </Tab.Navigator>
        );
    }, [lang]);

    const UnAuthNavigator = useCallback(() => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }, [lang]);

    const AuthNavigator = useCallback(() => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon source='chevron-left' size={24} color={theme.colors.primary} />
                                <AirCarerText>{i18n.t('back')}</AirCarerText>
                            </View>
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen
                    name='/'
                    component={RenderTabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='EditPublicProfile' component={EditPublicProfileScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.title')
                }} />
                <Stack.Screen name='SkillsSettings' component={SkillsSettingsScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.skillsSettingsTitle')
                }} />
                <Stack.Screen name='Transportation' component={TransportationScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.transportation')
                }} />
                <Stack.Screen name='Languages' component={LanguagesScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.languages')
                }} />
                <Stack.Screen name='Education' component={EducationScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.education')
                }} />
                <Stack.Screen name='Work' component={WorkScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.work')
                }} />
                <Stack.Screen name='Specialties' component={SpecialtiesScreen} options={{
                    headerShown: true, headerTitle: i18n.t('editProfile.specialties')
                }} />
                <Stack.Screen name='account/setting' component={AppSetting} options={{
                    headerShown: true, headerTitle: i18n.t('accountTab.settings')
                }} />
                <Stack.Screen
                    name="signup/servicingHours"
                    component={SignupServicingHours}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name="signup/pricing"
                    component={SignupPricing}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name="property/list"
                    component={PropertyList}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name='property/add'
                    component={AddProperty}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name='property/addPhotos'
                    component={AddPropertyPhotos}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name='browsing-task/task-detail'
                    component={MyTaskDetailScreen}
                    options={{ headerShown: true, headerTitle: 'Task Detail' }}
                />
                <Stack.Screen
                    name='my-task/detail'
                    component={TaskDetailScreen}
                    options={{ headerShown: true, headerTitle: 'My Task Detail' }}
                />

                {/* Publish Task Screens */}
                <Stack.Screen
                    name="publishTaskDate"
                    component={PublishTaskDateScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('publishTab.chooseTime')
                    }}
                />
                <Stack.Screen
                    name="publishTaskPropertyDetails"
                    component={PublishTaskPropertyDetailsScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('publishTab.whatsPlaceLike')
                    }}
                />
                <Stack.Screen
                    name="PublishTaskPhotosScreen"
                    component={PublishTaskPhotosScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('publishTaskPhotos.header')
                    }}
                />
                <Stack.Screen
                    name="publishTaskBudget"
                    component={PublishTaskBudgetScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('publishTaskBudget.header')
                    }}
                />
                <Stack.Screen
                    name="publishTaskPost"
                    component={PublishTaskPostScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('publishTaskPost.readyToPost')
                    }}
                />

                {/* Verification Screen */}
                <Stack.Screen
                    name="VerificationScreen"
                    component={VerificationScreen}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('editProfile.verificationTitle')
                    }}
                />

                <Stack.Screen
                    name='signup/profile'
                    component={CreateProfile}
                    options={{
                        headerShown: true,
                        headerTitle: i18n.t('signupTab.createProfile'),
                        headerTitleStyle: {
                            fontWeight: "800",
                            color: theme.colors.primary
                        }
                    }}
                />
                <Stack.Screen
                    name='browsing-task/task-conclusion'
                    component={TaskConclusionScreen}
                    options={{ headerShown: true, headerTitle: 'Task Conclusion' }}
                />
            </Stack.Navigator>
        )
    }, [lang]);

    const renderNavigator = () => {
        if (isLoading) return <></>;
        if (user) return <AuthNavigator />;
        return <UnAuthNavigator />;
    }


    return renderNavigator();
};

const AppNavigation = () => (
    <SkillsProvider>
        <Navigation />
    </SkillsProvider>
);

export default AppNavigation;
