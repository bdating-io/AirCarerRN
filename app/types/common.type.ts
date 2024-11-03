import { NavigationProp } from '@react-navigation/core';

// Define the type for stack navigation prop
export type RootStackParamList = {
    index: undefined;
    signup: undefined;
    'signup/pricing': undefined;
    'signup/profile': undefined;
    'signup/servicingHours': undefined;
    browsingTask: undefined;
    goBack: undefined;
    'login': undefined;
    'my-task/detail': undefined;
    'browsing-task/task-detail': undefined;
    EditPublicProfile: undefined;
    SkillsSettings: undefined;
    Specialties: undefined;
    Transportation: undefined;
    Languages: undefined;
    Education: undefined;
    Work: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
