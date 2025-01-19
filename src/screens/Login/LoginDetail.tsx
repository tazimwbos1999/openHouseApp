import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchMastersData, registerUser } from '@/services/OtpService';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { SignInDetailsSchema } from '@/components/schema/schema';
import type { SignInDetailsSchemaType } from '@/components/schema/schema';

interface LoginDetailsProps {
  onSuccess: () => void;
}

const LoginDetails: React.FC<LoginDetailsProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [alternateNumber, setAlternateNumber] = useState('');
  const [businessOpen, setBusinessOpen] = useState(false);
  const [societiesOpen, setSocietiesOpen] = useState(false);
  const [businessAreaValue, setBusinessAreaValue] = useState<string[] | null>(null);
  const [societyValue, setSocietyValue] = useState<string[] | null>(null);
  const {
    backgrounds,
    borders,
    colors,
    fonts,
    gutters,
    layout,
  } = useTheme();


  const [mastersData, setMastersData] = useState<null | {
    localities: { name: string }[];
    societies: { name: string }[];
  }>(null);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<SignInDetailsSchemaType>({
    resolver: zodResolver(SignInDetailsSchema),
  });

  useEffect(() => {
    setupMastersData();
  }, []);

  const setupMastersData = async () => {
    try {
      const data = await fetchMastersData();
      setMastersData(data);
    } catch (error) {
      console.error('Error fetching master data:', error);
      Alert.alert('Error', 'Unable to fetch data. Please try again.');
    }
  };

  const businessAreaOptions = mastersData ? mastersData.localities.map(l => l.name) : [];
  const scocietyOptions = mastersData ? mastersData.societies.map(s => s.name) : [];


  const handleSubmitData = async (data: SignInDetailsSchemaType) => {
    try {
      const formattedLocalities = businessAreaValue ? businessAreaValue.join(',') : '';
      const formattedSocieties = societyValue ? societyValue.join(',') : '';
      const altNumber = alternateNumber || '';

      // Call API to register the user
      const response = await registerUser(data.fullName, formattedLocalities, altNumber, formattedSocieties);
      console.log('User registered successfully:', response);
      onSuccess();
      // Reset form fields
      setFullName('');
      setAlternateNumber('');
      setBusinessAreaValue(null);
      setSocietyValue(null);
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={[layout.itemsCenter, gutters.gap_32, gutters.marginTop_48]}>
      <View style={[layout.itemsCenter, backgrounds.gray300, gutters.padding_8, { borderRadius: "50%", width: 111 }]}>
        <IconByVariant path='userlogo' width={66} height={66} />
      </View>
      <Text style={[fonts.size_24, fonts.semiBold, { textAlign: "center" }]}>Channel Partner Details</Text>

      <View style={[layout.fullWidth]}>
        <Text style={[fonts.size_16, fonts.interSemiBold]}>Full Name<Text style={[{ color: colors.commonRed }]}>*</Text></Text>
        <TextInput
          style={[layout.fullWidth, gutters.padding_16, borders.rounded_4, fonts.size_16, fonts.interSemiBold, backgrounds.gray300]}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(value) => {
            setFullName(value);
            setValue('fullName', value);
        }}
        {...control.register('fullName')}
          placeholderTextColor={colors.gray500}
        />
        {errors.fullName && <Text style={{ color: 'red' }}>{errors.fullName.message}</Text>}
      </View>
      <View style={[layout.fullWidth]}>
        <Text style={[fonts.size_16, fonts.interSemiBold]}>Alternate Number</Text>
        <TextInput
          style={[layout.fullWidth, gutters.padding_16, borders.rounded_4, fonts.size_16, fonts.interSemiBold, backgrounds.gray300]}
          placeholder="If the login number is not on whatsapp"
          keyboardType="phone-pad"
          value={alternateNumber}
          onChangeText={setAlternateNumber}
          placeholderTextColor={colors.gray500}
        />
      </View>
      <View>
        <Text style={[fonts.size_16, fonts.interSemiBold]}>Area of Business</Text>
        <DropDownPicker
          open={businessOpen}
          value={businessAreaValue}
          items={businessAreaOptions.map(b => ({ label: b, value: b }))}
          setOpen={setBusinessOpen}
          setValue={setBusinessAreaValue}
          mode='BADGE'
          placeholder="Select your business area"
          multiple={true}
          zIndex={2000}
          searchable={true}
          searchPlaceholder="Search area..."
          placeholderStyle={[fonts.size_16, fonts.interSemiBold, { color: colors.gray500 }]}
          style={[layout.fullWidth, gutters.padding_16, borders.rounded_4, backgrounds.gray300, { borderWidth: 0 }]}
        />
      </View>
      <View>
        <Text style={[fonts.size_16, fonts.interSemiBold]}>Key Societies you work in</Text>
        <DropDownPicker
          open={societiesOpen}
          value={societyValue}
          items={scocietyOptions.map(s => ({ label: s, value: s }))}
          setOpen={setSocietiesOpen}
          setValue={setSocietyValue}
          mode='BADGE'
          placeholder="Select societies"
          multiple={true}
          zIndex={1000}
          searchable={true}
          searchPlaceholder="Search society..."
          placeholderStyle={[fonts.size_16, fonts.interSemiBold, { color: colors.gray500 }]}
          style={[layout.fullWidth, gutters.padding_16, borders.rounded_4, backgrounds.gray300, { borderWidth: 0 }]}
        />
      </View>
      <ButtonPrimary onPress={handleSubmit(handleSubmitData)} text='Continue' />
    </View>
  );
};

export default LoginDetails;
