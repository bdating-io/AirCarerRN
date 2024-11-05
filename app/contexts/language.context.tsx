import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { aircarerSlice } from '@app/slices/aircarer.slice';
import { getLocales } from 'expo-localization';
import { i18n } from '@app/locales/i18n';

interface LanguageContextType {
    lang: string;
    changeLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: SecureStore.getItem('lang') || 'en',
    changeLanguage: async () => { },
});

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const { lang } = useSelector((state: RootState) => state.aircarer);

    useEffect(() => {
        try {
            const savedLan = SecureStore.getItem('lang');
            if (savedLan) {
                console.log('savedLan:', savedLan);
                i18n.locale = savedLan;
                dispatch(aircarerSlice.actions.setLang(savedLan));
            } else {
                // If there's no saved language, use the device's default language
                const defaultLan = getLocales()[0].languageCode;
                i18n.locale = defaultLan || 'en';
            }
        } catch (error) {
            console.error('Error loading saved language:', error);
            i18n.locale = 'en';
        }
    }, []);

    const changeLanguage = async (language: string) => {
        i18n.locale = language;
        await SecureStore.setItemAsync('lang', language);
        dispatch(aircarerSlice.actions.setLang(language));
    };

    return (
        <LanguageContext.Provider value={{ lang: lang, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
