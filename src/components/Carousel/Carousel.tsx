import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text,} from 'react-native';
import { useTheme } from '@/theme';
import IconByVariant from "@/components/atoms/IconByVariant/IconByVariant";
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CarouselProps = {
    loginBannerData: { iconImage: string, name: string, caption: string }[];
};

const Carousel: React.FC<CarouselProps> = ({ loginBannerData }) => {
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
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SCREEN_WIDTH);
        setCurrentImageIndex(index);
    };

    return (
        <View style={[gutters.padding_24 ,gutters.gap_16, borders.w_1, borders.gray500, borders.rounded_16]}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {loginBannerData.map((data, index) => (
                    <View key={index} style={[gutters.gap_8, borders.w_1]}>
                        <View style={[gutters.gap_8,layout.z10 ]}>
                        <Text style={[fonts.size_16 , {letterSpacing:3}]}>{data.caption}</Text>
                        <Text style={[fonts.size_24, fonts.bold, {width:"40%"}]}>{data.name}</Text>
                        </View>
                        <IconByVariant 
                            path={data.iconImage}
                            height={200}
                            width={200}
                            style={[]}
                        />
                        </View>
                ))}
            </ScrollView>
            <View style={[ layout.row, layout.justifyCenter, gutters.gap_8]}>
                {loginBannerData.map((_, index) => (
                    <View
                        key={index}
                        style={[ backgrounds.gray400, borders.rounded_16, gutters.padding_8,
                            currentImageIndex === index && backgrounds.primaryMain,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default Carousel;
