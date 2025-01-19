// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import type { RootScreenProps } from '@/navigation/types';
// import { Text, View } from 'react-native';
// import { getUserData } from '@/services/OtpService';
// import { fetchHomesData } from "@/services/HomeService";
// import { useTheme } from '@/theme';
// import { Paths } from '@/navigation/paths';
// import { SafeScreen } from '@/components/templates';
// //import { IHomeProps } from '@/theme/types/homes';

// // type Props = {
// //   homes: IHomeProps[];
// // };

// const HomeScreen = ({ navigation}: RootScreenProps<Paths.HomeScreen>) => {
//   const { layout } = useTheme();
//     const [brokerData, setBrokerData] = useState<null | { fullName: string, phoneNumber: string }>(null);
//     const isRegistered = !!(brokerData && brokerData.fullName);
//     const [loading, setLoading] = useState(true);

//       useEffect(() => {
//         updateBrokerData();
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//           const data = await fetchHomesData();
//           console.log("data", data[0])
//         } catch (error) {
//           console.error('Error loading homes data:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       const updateBrokerData = async () => {
//         try {
//             const authToken = await AsyncStorage.getItem('auth_token');
//             //AsyncStorage.removeItem("auth_token");
//             if (!authToken) {
//                 setBrokerData(null);
//             } else {
//                 try {
//                     const data = await getUserData(authToken);
//                     if (data) {
//                         setBrokerData(data);
//                     }
//                 } catch (error) {
//                     await AsyncStorage.removeItem('auth_token');
//                 }
//             }
//         } catch (error) {
//             console.error('Error accessing AsyncStorage:', error);
//         }
//     };

//   return (
//     <SafeScreen>
//       <View
//         style={[
//           layout.flex_1,
//           layout.col,
//           layout.itemsCenter,
//           layout.justifyCenter,
//         ]}
//       >
//         <Text>Welcome to home page</Text>
//         <Text>Welcome to home page</Text>
//         <Text>Welcome to home page</Text>
//         <Text>Welcome to home page</Text>
//         <Text>Welcome to home page</Text>
//         <Text>Welcome to home page</Text>
//       </View>
//     </SafeScreen>
//   );
// }

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootScreenProps } from '@/navigation/types';
import { Text, View } from 'react-native';
import { getUserData } from '@/services/OtpService';
import { fetchHomesData } from "@/services/HomeService";
import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';
import { SafeScreen } from '@/components/templates';
import  HomeView  from "@/screens/Home/HomeView"
//import { IHomeProps } from '@/theme/types/homes';

// type Props = {
//   homes: IHomeProps[];
// };

const HomeScreen = ({ navigation}: RootScreenProps<Paths.HomeScreen>) => {
  const { layout } = useTheme();
    const [brokerData, setBrokerData] = useState<null | { fullName: string, phoneNumber: string }>(null);
    const isRegistered = !!(brokerData && brokerData.fullName);
    const [loading, setLoading] = useState(true);
    const [home , setHome ] = useState([])

      useEffect(() => {
        updateBrokerData();
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const data = await fetchHomesData();
          setHome(data);
          console.log("data", data[0])
        } catch (error) {
          console.error('Error loading homes data:', error);
        } finally {
          setLoading(false);
        }
      };

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

  return (
    <SafeScreen>
      <HomeView homes={home}/>
    </SafeScreen>
  );
}

export default HomeScreen;
