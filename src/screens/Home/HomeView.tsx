import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { IHomeProps } from '@/theme/types/homes';

type Props = {
  homes: IHomeProps[];
};

const HomeView = ({ homes}: Props) => {
  const { layout } = useTheme();

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        {homes.map((home, index) => (
            <View key={index}>
                <Text>{home.slug}</Text>
                <Text>{home.floor}</Text>
            </View>
          ))}
      </View>
    </SafeScreen>
  );
}

export default HomeView;
