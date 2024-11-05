import { NavigationProp } from '@react-navigation/core';

// Define the type for stack navigation prop
export type RootStackParamList = {
    '/': any;
    index: any;
    signup: any;
    'signup/pricing': any;
    'signup/profile': any;
    'signup/servicingHours': any;
    browsingTask: any;
    goBack: any;
    'login': any;
    'my-task/detail': any;
    'browsing-task/task-detail': any;
    'browsing-task/task-conclusion': any;
    EditPublicProfile: any;
    SkillsSettings: any;
    Specialties: any;
    Transportation: any;
    Languages: any;
    Education: any;
    Work: any;
    VerificationScreen: any;
    publishTaskPost: any;
    publishTaskBudget: any;
    PublishTaskPhotosScreen: any;
    publishTaskPropertyDetails: any;
    publishTaskDate: any;
    'property/list': any;
    'property/add': any;
    'property/addPhotos': any;
    Account: any;
    'account/setting': any;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
