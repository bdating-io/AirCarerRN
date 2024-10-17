import { Image, TouchableOpacity } from 'react-native';
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
import { Icon } from 'react-native-paper';
import MyTaskDetailScreen from '@app/screens/my-task/myTaskDetail';
import TaskDetailScreen from '@app/screens/browsing-task/taskDetail';
import theme from '@app/constants/theme';
import { i18n } from '@app/locales/i18n';
import { useCallback } from 'react';
import { useLanguage } from '@app/contexts/language.context';


const Navigation = () => {
    const { lang } = useLanguage();
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator<RootStackParamList>();

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
                        <Icon source='chevron-left' size={24} color={theme.colors.primary} />
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