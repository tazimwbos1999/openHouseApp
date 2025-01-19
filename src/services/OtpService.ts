import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//const API_BASE_URL = 'https://core-561394753846.asia-south2.run.app/api/v1/oh';
const API_BASE_URL = 'http://192.168.29.199:8080/api/v1/oh'

export const requestOTP = async (phoneNumber: number) => {
  const response = await axios.post(`${API_BASE_URL}/otp/`, {
    phone_number: phoneNumber,
  });
  console.log("response data of request OTP", response)
  return response.data;
};

export const verifyOTP = async (otpToken: string, otpCode: string) => {
  const response = await axios.post(`${API_BASE_URL}/verify/`, {
    otp_token: otpToken,
    otp_code: otpCode
  });
  console.log("response data of verify OTP", response);
  return response.data;
};

export const registerUser = async (
    fullName: string,
    localities: string,
    altNumber: string,
    societies: string,
  ) => {
  try {
    const authToken = await AsyncStorage.getItem('auth_token');
      const response = await axios.post(
        `${API_BASE_URL}/register/`,
        {
          full_name: fullName,
          localities,
          alt_number: altNumber,
          societies,
        },
        {
          headers: {
            authorization: authToken,
          },
        }
      );
      console.log("response data of register", response);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  export const getUserData = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-user-data/`, {
        headers: {
          authorization: authToken,
        },
      });
      console.log("response data of get user data", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  export async function fetchMastersData() {
    try {
      const response = await fetch(
        `${'https://core-561394753846.asia-south2.run.app/api/v1/oh/'}get-public-masters/`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch homes data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching homes data:', error);
      return [];
    }
}
  