// CustomText.tsx
import { useFontSize } from '@app/contexts/font.context';
import React from 'react';
import { Text, TextProps } from 'react-native';
import theme from './theme';

const H1_OFFSET = 8;
const H2_OFFSET = 4;

interface AircarerTextProps extends TextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'subtitle' | 'button' | 'bold' | 'default';
}

const AirCarerText: React.FC<AircarerTextProps> = ({ style, variant = 'default', children, ...props }) => {
    const { fontSize } = useFontSize();

    switch (variant) {
        case 'h1':
            return (
                <Text style={[{ fontSize: fontSize + H1_OFFSET, fontWeight: '900', color: theme.colors.primary }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'h2':
            return (
                <Text style={[{ fontSize: fontSize + H2_OFFSET, fontWeight: '700', color: theme.colors.primary }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'subtitle':
            return (
                <Text style={[{ fontSize: fontSize + H2_OFFSET, fontWeight: '900', color: theme.colors.primary }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'bold':
            return (
                <Text style={[{ fontSize, fontWeight: '900', color: theme.colors.primary }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'button':
            return (
                <Text style={[{ fontSize, fontWeight: '900', color: '#fff' }, style]} {...props}>
                    {children}
                </Text>
            );
        default:
            return (
                <Text style={[{ fontSize, color: theme.colors.primary }, style]} {...props}>
                    {children}
                </Text>
            );
    }
};

export default AirCarerText;