import { Image, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// Screens
import BrowsingTaskScreen from '@app/screens/browsing-task';

// images
import Logo from '@assets/images/logo.png';

// Others
import { RootStackParamList } from '@app/types/common.type';
import PublishTaskScreen from '@app/screens/publish-task';
import MyTaskScreen from '@app/screens/my-task';
import AccountScreen from '@app/screens/account';
import LoginScreen from '@app/screens/login';
import { Icon } from 'react-native-paper';
import MyTaskDetailScreen from '@app/screens/my-task/myTaskDetail';
import TaskDetailScreen from '@app/screens/browsing-task/taskDetail';
import theme from '@app/constants/theme';
import { i18n } from '@app/locales/i18n';
import { useCallback, useEffect } from 'react';
import { useLanguage } from '@app/contexts/language.context';
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from 'expo-router';
import SignupPricing from '@app/screens/signup/signupPricing';
import SignupServicingHours from '@app/screens/signup/signupServicingHours';
import AirCarerText from '@app/constants/AirCarerText';


const Navigation = () => {
    const { lang } = useLanguage();
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigation = useNavigation();

    const { user, isLoading } = useAuth0();

    useEffect(() => {
        if (!isLoading && !user) {
            navigation.navigate('login' as never);
            console.log('not logged in, redirect to signup');
        }
    }, [isLoading, user]);

    const renderTabIcon = (route: any, focused: boolean) => {
        let icon = '';

        switch (route.name) {
            case 'PublishTaskScreen':
                icon = 'check-circle-outline';
                break;
            case 'BrowsingTaskScreen':
                icon = 'magnify';
                break;
            case 'MyTaskScreen':
                icon = 'clipboard-text-outline';
                break;
            case 'Account':
                icon = 'account-circle-outline';
                break;
        }
        return (
            <Icon
                source={`${icon}`}
                color={focused ? theme.colors.secondary : theme.colors.primary}
                size={24}
            />
        );
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
                    headerTitle: () => (
                        <Image
                            source={Logo}
                            style={{ width: 240, height: 45 }} />
                    )
                })}>
                <Tab.Screen
                    name='PublishTaskScreen'
                    component={PublishTaskScreen}
                    options={{
                        tabBarLabel: i18n.t('publishTask'),
                    }}
                />
                <Tab.Screen
                    name='BrowsingTaskScreen'
                    component={BrowsingTaskScreen}
                    options={{
                        tabBarLabel: i18n.t('browsingTasks'),
                    }}
                />
                <Tab.Screen
                    name='MyTaskScreen'
                    component={MyTaskScreen}
                    options={{
                        tabBarLabel: i18n.t('myTasks'),
                    }}
                />
                <Tab.Screen
                    name='Account'
                    component={AccountScreen}
                    options={{
                        tabBarLabel: i18n.t('account'),
                    }}
                />
            </Tab.Navigator>
        );
    }, [lang]);

    return (
        <Stack.Navigator
            screenOptions={({
                navigation,
            }: {
                navigation: NativeStackNavigationProp<RootStackParamList>;
            }) => ({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon source='chevron-left' size={24} color={theme.colors.primary} />
                            <AirCarerText variant='default'>{i18n.t('back')}</AirCarerText>
                        </View>
                    </TouchableOpacity>
                ),
                headerTitleAlign: 'center',
            })}>
            <Stack.Screen
                name='index'
                component={RenderTabNavigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='login'
                component={LoginScreen}
                options={{ headerShown: false }}
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
                name='browsing-task/task-detail'
                component={MyTaskDetailScreen}
                options={{ headerShown: true, headerTitle: 'Task Detail' }}
            />
            <Stack.Screen
                name='my-task/detail'
                component={TaskDetailScreen}
                options={{ headerShown: true, headerTitle: 'My Task Detail' }}
            />
        </Stack.Navigator>
    );
};

export default Navigation;
