// CustomText.tsx
import { useFontSize } from '@app/contexts/font.context';
import React from 'react';
import { Text, TextProps } from 'react-native';

const H1_OFFSET = 8;
const H2_OFFSET = 4;

interface AircarerTextProps extends TextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'button';
}

const AirCarerText: React.FC<AircarerTextProps> = ({ style, variant='default', children, ...props }) => {
    const { fontSize } = useFontSize();

    switch (variant) {
        case 'h1':
            return (
                <Text style={[{ fontSize: fontSize + H1_OFFSET, fontWeight: 'bold' }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'h2':
            return (
                <Text style={[{ fontSize: fontSize + H2_OFFSET }, style]} {...props}>
                    {children}
                </Text>
            );
        case 'button':
            return (
                <Text style={[{ fontSize, fontWeight: 'bold' }, style]} {...props}>
                    {children}
                </Text>
            );
        default:
            return (
                <Text style={[{ fontSize }, style]} {...props}>
                    {children}
                </Text>
            );
    }
};

export default AirCarerText;