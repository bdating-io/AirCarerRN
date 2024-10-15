import { NavigationProp } from '@react-navigation/core';

// Define the type for stack navigation prop
export type RootStackParamList = {
    index: undefined;
    browsingTask: undefined;
    goBack: undefined;
    'my-task/detail': undefined;
    'browsing-task/task-detail': undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
