import React, { useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { IconByVariant } from '@/components/atoms';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { useTheme } from '@/theme';

interface CpCodeProps {
    onReset: () => void;
  }

const CpCode : React.FC<CpCodeProps> = ({onReset}) => {
    const [cpDigits, setCpDigits] = useState<string[]>(['', '', '', '', '', '', '']);
    const inputRefs = useRef<Array<TextInput>>(
            [...Array(7)].map(() => React.createRef<TextInput>()),
        );
    const {
        backgrounds,
        borders,
        components,
        fonts,
        gutters,
        layout,
    } = useTheme();
    
    const handleCpCodeChange = (value: string, index: number) => {
        const newCpDigits = [...cpDigits];
        newCpDigits[index] = value;
        setCpDigits(newCpDigits);

        if (value === '' && index !== 0) {
            inputRefs.current[index - 1]?.focus();
        }

        else if (value && index !== cpDigits.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    const handleCpCode = () => {
        // Implement resend cpcode logic here
    };

    const handleSubmitCpCode = () => {
        // Implement submit cp code logic here
    };

    const handleSignin = async () => {
        onReset();
    }

    return (
        <View style={[gutters.gap_32, layout.itemsCenter, gutters.marginTop_40]}>
            <View style={[gutters.gap_40]}>
                <View style={[layout.itemsCenter, gutters.gap_16]}>
                    <IconByVariant path='emailInbox' width={111} height={96} />
                    <Text style={[fonts.size_24, fonts.semiBold]}>Enter CP Code</Text>
                    <Text style={[fonts.size_16, fonts.normal, fonts.gray600, gutters.paddingHorizontal_8, { textAlign: "center" }]}>Please enter CP code shared by our RM to start your account</Text>
                </View>
                <View style={[layout.row, layout.fullWidth, layout.justifyBetween]}>
                    {cpDigits.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref: any) => (inputRefs.current[index] = ref)}
                            style={[fonts.size_24, backgrounds.gray300, borders.rounded_4, components.textInput10]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={value => handleCpCodeChange(value, index)}
                        />
                    ))}
                </View>
            </View>

            <ButtonPrimary onPress={handleSubmitCpCode} text="Submit" />
            <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
                <Text style={[fonts.size_16, fonts.normal, fonts.gray700]}>Dont't have a code?</Text>
                <TouchableOpacity onPress={handleCpCode}>
                    <Text style={[fonts.size_16, fonts.interSemiBold, fonts.primaryMain]}>Request Again</Text>
                </TouchableOpacity>
            </View>
            <View style={[layout.row, layout.itemsCenter, gutters.gap_16]}>
                <IconByVariant path='caret-left' width={16} height={16}/>
                <TouchableOpacity onPress={handleSignin}>
                    <Text style={[fonts.size_16, fonts.interSemiBold]}>Return to sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CpCode;