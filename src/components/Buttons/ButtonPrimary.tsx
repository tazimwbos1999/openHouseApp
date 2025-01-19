import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { useTheme } from '@/theme';

interface ButtonPrimaryProps {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ text, onPress }) => {
    const {
        backgrounds,
        borders,
        fonts,
        gutters,
        layout,
    } = useTheme();

    return (
        <TouchableOpacity style={[layout.fullWidth, layout.itemsCenter, gutters.padding_16, borders.rounded_8, backgrounds.commonBlack]} onPress={onPress}>
            <Text style={[fonts.bold, fonts.size_16, fonts.commonWhite]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ButtonPrimary;