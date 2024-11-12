import theme from '@app/constants/theme';
import React, { useState, createContext, useContext, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const SnackbarContext = createContext({
    info: (message: string, ico?: string, action?: { label: string; onPress: () => void }) => { },
    error: (message: string, ico?: string, action?: { label: string; onPress: () => void }) => { },
    success: (message: string, ico?: string, action?: { label: string; onPress: () => void }) => { },
});

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarProviderProps {
    children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [action, setAction] = useState<{ label: string; onPress: () => void } | undefined>(undefined);
    const [icon, setIcon] = useState<IconSource | undefined>(undefined);
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined);

    const show = useCallback((msg: string, action?: { label: string; onPress: () => void }, ico?: string | undefined, bgColor?: string | undefined) => {
        setMessage(msg);
        setAction(action);
        setVisible(true);
        setIcon(ico);
        setBackgroundColor(bgColor);
    }, []);

    const onDismiss = () => setVisible(false);

    const info = useCallback((message: string, ico: string = 'information', action?: { label: string; onPress: () => void }) => {
        show(message, action, ico, '#58B2DC');
    }, [show]);

    const error = useCallback((message: string, ico: string = 'close-circle', action?: { label: string; onPress: () => void }) => {
        show(message, action, ico, theme.colors.error);
    }, [show]);

    const success = useCallback((message: string, ico: string = 'check-circle', action?: { label: string; onPress: () => void }) => {
        show(message, action, ico, '#1B813E');
    }, [show]);


    return (
        <SnackbarContext.Provider value={{ info, error, success }}>
            {children}
            <View style={styles.snackbarTop}>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismiss}
                    action={action}
                    duration={Snackbar.DURATION_SHORT}
                    elevation={5}
                    icon={icon}
                    onIconPress={onDismiss}
                    style={{ backgroundColor }}
                >
                    {message}
                </Snackbar>
            </View>
        </SnackbarContext.Provider>
    );
};

import { Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    snackbarTop: {
        position: 'absolute',
        top: screenHeight * 0.08,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
});

