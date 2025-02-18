import {View, StyleSheet, Text, FlatList} from "react-native";
import {Colors} from "@/constants/Colors";
import {NewsDataType} from "@/types";
import SliderItem from "@/components/SliderItem";
import {useState} from "react";

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({newsList}: Props) => {
    const [data, setData] = useState(newsList);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>BreakingNews</Text>
            <View style={styles.sideWrapper}>
                <FlatList data={data} keyExtractor={(_, index) => `list_item${index}`} renderItem={({item, index}) => (
                    <SliderItem sliderItem={item} index={index}/>
                )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
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

