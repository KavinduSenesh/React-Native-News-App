import {View, StyleSheet, Text, FlatList} from "react-native";
import {Colors} from "@/constants/Colors";
import {NewsDataType} from "@/types";
import SliderItem from "@/components/SliderItem";
import {useState} from "react";
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({newsList}: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.sideWrapper}>
                <Animated.FlatList data={data} keyExtractor={(_, index) => `list_item${index}`} renderItem={({item, index}) => (
                    <SliderItem sliderItem={item} index={index} scrollX={scrollX}/>
                )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            onScroll={onScrollHandler}
                            scrollEventThrottle={16}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => setData([...data, ...newsList])}
                />
            </View>
        </View>
    );
}

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    sideWrapper: {
        // width: '100%',
        // flex: 1,
        justifyContent: 'center',
    }
})

