import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginDetails from '@/screens/Login/LoginDetail';
import { IconByVariant } from '@/components/atoms';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import CpCode from "@/screens/Login/CpCode";
import Carousel from 'react-native-reanimated-carousel';
import { requestOTP, verifyOTP, getUserData } from '@/services/OtpService';

import { SignInSchema } from '@/components/schema/schema';
import type { SignInSchemaType} from '@/components/schema/schema';

const Login = ({ navigation }: RootScreenProps<Paths.Login>) => {
//const Login: React.FC<RootScreenProps<Paths.Login>> = () => {
    const {
        backgrounds,
        borders,
        changeTheme,
        colors,
        components,
        fonts,
        gutters,
        layout,
        variant,
    } = useTheme();
    const [brokerData, setBrokerData] = useState<null | { fullName: string, phoneNumber: string }>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [otpScreen, setOtpScreen] = useState<boolean>(false);
    const [otpSubmit, setOtpSubmit] = useState<boolean>(false);
    const [otpToken, setOtpToken] = useState<string>('');
    const [userData, setUserData] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const width = Dimensions.get('window').width;
    const isRegistered = !!(brokerData && brokerData.fullName);

    const inputRefs = useRef<Array<TextInput>>(
        [...Array(4)].map(() => React.createRef<TextInput>()),
    );

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
    });

    useEffect(() => {
        updateBrokerData();
    }, []);

    useEffect(() => { 
        if (isRegistered) { 
            navigation.navigate(Paths.HomeScreen); 
        } 
    }, [isRegistered, navigation]);

    const loginBannerDetails = [
        {
            iconImage: 'banner1',
            name: 'Support with paperwork, legalities, and loans',
            caption: 'COMPREHENSIVE SUPPORT',
        },
        {
            iconImage: 'banner2',
            name: 'flexible visit scheduling even on short notice',
            caption: 'SHOWCASE PREMIUM HOMES',
        },
        {
            iconImage: 'banner3',
            name: 'Offer your buyers our exclusive inventory',
            caption: 'EARN COMMISSION',
        },

    ];

    const updateBrokerData = async () => {
        try {
            const authToken = await AsyncStorage.getItem('auth_token');
            //AsyncStorage.removeItem("auth_token");
            if (!authToken) {
                setBrokerData(null);
            } else {
                try {
                    const data = await getUserData(authToken);
                    if (data) {
                        setBrokerData(data);
                    }
                } catch (error) {
                    await AsyncStorage.removeItem('auth_token');
                }
            }
        } catch (error) {
            console.error('Error accessing AsyncStorage:', error);
        }
    };

    const handleOtpChange = (txt: string, index: number) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = txt;
        setOtpDigits(newOtpDigits);

        // const otpValue = newOtpDigits.join('');
        // setOtpValue("otp", otpValue);
        // console.log("otp vallue", otpValue);

        if (txt === '' && index !== 0) {
            inputRefs.current[index - 1]?.focus();
        }

        else if (txt && index !== otpDigits.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleGetOtp = async (data: SignInSchemaType) => {
        if (data.phoneNumber.length === 10) {
            try {
                const otpTokenResponse = await requestOTP(data.phoneNumber);
                console.log("OTP Token", otpTokenResponse);
                setOtpToken(otpTokenResponse.otpToken);
                setOtpScreen(true);
            } catch (error) {
                console.error("Error requesting OTP:", error);
                Alert.alert("Failed to request OTP. Please try again.");
            }
        } else {
            Alert.alert('Please enter a valid phone number');
        }
    };

    const handleResendOtp = async (data: SignInSchemaType) => {
        try {
            const otpTokenResponse = await requestOTP(data.phoneNumber);
            console.log("OTP Token", otpTokenResponse);
            setOtpToken(otpTokenResponse.otpToken);
        } catch (error) {
            console.error("Error resending OTP:", error);
            Alert.alert("Failed to resend OTP. Please try again.");
        }
    };

    const handleSubmitOtp = async () => {
        const otpCode = otpDigits.join('');
        if (otpCode.length === 4) {
            try {
                const { authToken } = await verifyOTP(otpToken, otpCode);
                console.log("otp valid", authToken);
                await AsyncStorage.setItem('auth_token', authToken);
                const user_data = await getUserData(authToken);
                setUserData(user_data);

                if (!user_data.fullName) {
                    console.log("User data not found, redirecting to registration page");
                    setOtpSubmit(true);
                } else {
                    console.log("User data found, redirecting to home page");
                    updateBrokerData();
                    setOtpSubmit(false);
                }
            } catch (error) {
                console.error("Error verifying OTP:", error);
                setOtpError("OTP is not valid. Please try again.");
            }
        } else {
            setOtpError("Please enter a valid OTP.");
        }
    };

    const ResetAuthToken = async () => { 
        await AsyncStorage.removeItem('auth_token'); 
    }

    const handleReset = async () => { 
        await ResetAuthToken(); 
        updateBrokerData(); 
        setOtpScreen(false); 
        setOtpSubmit(false); 
        setPhoneNumber('');    // here if we back mobile number reset 
        setOtpDigits(['', '', '', '']);  // here if we back otp field reset 
    };

    if (isRegistered) {
        return (
            <ScrollView style={[gutters.padding_16]}>
                <CpCode onReset = {handleReset} />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={[gutters.padding_16]}>
            {!otpScreen ? (
                <View style={[gutters.gap_32]}>
                    <View style={[layout.itemsCenter, gutters.marginTop_24]}>
                        <IconByVariant path='logoIcon' width={140} height={28} />
                    </View>
                    <View style={[gutters.padding_16, borders.w_1, borders.rounded_16]}>
                        <Carousel
                            //loop
                            width={width}
                            height={250}
                            //autoPlay={true}
                            data={loginBannerDetails}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => setActiveIndex(index)}
                            renderItem={({ item, index }) => (
                                <View key={index} style={[layout.relative, gutters.gap_8,]}>
                                    <Text style={[fonts.size_12, fonts.medium, { letterSpacing: 3 }]}>{item.caption}</Text>
                                    {/* <Text style={[fonts.size_24, fonts.extraBold, { width: '40%' }]}>{item.name}</Text> */}
                                    <Text style={[fonts.size_24, fonts.extraBold, { width: '40%' }]}>
                                        {index === 0 && (
                                            <>
                                                Support with{' '}
                                                <Text style={[fonts.primaryMain]}>paperwork, legalities, and loans</Text>
                                            </>
                                        )}
                                        {index === 1 && (
                                            <>
                                                <Text style={[fonts.primaryMain]}>flexible visit scheduling</Text> even on short notice
                                            </>
                                        )}
                                        {index === 2 && (
                                            <>
                                                Offer your buyers our{' '}
                                                <Text style={[fonts.primaryMain]}>exclusive inventory</Text>
                                            </>
                                        )}
                                    </Text>
                                    <IconByVariant
                                        path={item.iconImage}
                                        height={210}
                                        width={210}
                                        style={[layout.absolute, { left: "36%", top: "20%" }]}
                                    />
                                </View>
                            )}
                        />
                        <View style={[layout.row, layout.justifyCenter, gutters.gap_8]}>
                            {loginBannerDetails.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        backgrounds.gray400, borders.rounded_16, gutters.padding_4,
                                        activeIndex === index && backgrounds.primaryMain,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={[gutters.gap_32]}>
                        <Text style={[fonts.size_24, fonts.semiBold, { textAlign: "center" }]}>Sign-up/ Sign-in</Text>
                        <View style={[gutters.gap_24, layout.itemsCenter]}>
                            <View style={[layout.fullWidth, gutters.gap_8]}>
                            <TextInput
                                style={[layout.fullWidth, gutters.padding_16, borders.rounded_4, fonts.size_16, fonts.interSemiBold, backgrounds.gray300]}
                                placeholder="Mobile Number"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={phoneNumber}
                                onChangeText={(value) => {
                                    setPhoneNumber(value);
                                    setValue('phoneNumber', value);
                                }}
                                {...control.register('phoneNumber')}
                            />
                            {errors.phoneNumber && <Text style={{ color: 'red' }}>{errors.phoneNumber.message}</Text>}
                            </View>
                            <ButtonPrimary onPress={handleSubmit(handleGetOtp)} text="GET OTP" />
                        </View>
                    </View>
                    <View style={[layout.itemsCenter, gutters.gap_16]}>
                        <Text style={[fonts.size_16, fonts.medium, fonts.gray400]}>Or Sign-in via</Text>
                        <TouchableOpacity onPress={() => { console.log("Sign-in with Google") }}>
                            <IconByVariant path='google' width={48} height={48} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : otpSubmit ? (
                <LoginDetails onSuccess={() => updateBrokerData()} />
            ) : (
                <View style={[gutters.gap_24, layout.itemsCenter]}>
                    <View style={[gutters.gap_40]}>
                        <View style={[layout.itemsCenter, gutters.marginTop_24]}>
                            <IconByVariant path='logoIcon' width={140} height={28} />
                        </View>
                        <View style={[layout.itemsCenter, gutters.gap_8]}>
                            <Text style={[fonts.size_24, fonts.semiBold,]}>We've sent the OTP</Text>
                            <View style={[layout.row, gutters.gap_8]}>
                                <Text style={[fonts.size_16, fonts.normal, fonts.gray600]}>+91 {phoneNumber ? phoneNumber : '**********'}</Text>
                                <TouchableOpacity onPress={() => setOtpScreen(false)}>
                                    <Text style={[fonts.size_16, fonts.interSemiBold, fonts.primaryMain]}>change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[gutters.gap_8]}>
                        <View style={[layout.row, layout.fullWidth, layout.justifyBetween]}>
                            {otpDigits.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref: any) => (inputRefs.current[index] = ref)}
                                    style={[fonts.size_16, backgrounds.gray300, borders.rounded_4, components.textInput20,]}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={value => { handleOtpChange(value, index) }}
                                />
                            ))}
                        </View>
                        {otpError && (
                                <Text style={[fonts.size_12, { color: 'red', textAlign: 'center' }]}>
                                    {otpError}
                                </Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleSubmit(handleResendOtp)}>
                        <Text style={[fonts.size_16, fonts.normal, fonts.primaryMain]}>Resend OTP</Text>
                    </TouchableOpacity>
                    <ButtonPrimary onPress={handleSubmitOtp} text="Sign in" />
                </View>)
            }
        </ScrollView>
    );
};

export default Login;
