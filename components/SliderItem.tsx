import {NewsDataType} from "@/types";
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";

type Props = {
    sliderItem: NewsDataType,
    index: number
}

const {width} = Dimensions.get('screen');

const SliderItem = ({sliderItem, index}: Props) => {
    return (
        <View style={styles.itemWrapper}>
            <Image source={{uri: sliderItem.image_url}} style={styles.image}/>
            <Text>{sliderItem.title}</Text>
        </View>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper: {
        // position: 'relative',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 20,
    }
})
