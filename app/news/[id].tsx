import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import {useEffect, useState} from "react";
import {NewsDataType} from "@/types";
import Loading from "@/components/Loading";
import {Colors} from "@/constants/Colors";

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id: string}>();
    const [news, setNews] = useState<NewsDataType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
            const response = await axios.get(url);

            // console.log(response.data);
            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }
        }catch (err: any) {
            console.log('Error Message: ', err.message);
        }
    };

    return (
        <>
        <Stack. Screen options={{
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={22} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name='heart-outline' size={22} />
                </TouchableOpacity>
            ),
            title: ''
        }} />
        {isLoading ? (
            <Loading size={'large'}/>
        ) : (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                <View>
                    <Text>{news[0].title}</Text>
                    <View style={styles.newsInfoWrapper}>
                        <Text style={styles.newsInfo}>{news[0].pubDate}</Text>
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
                    </View>
                    <Image source={{uri: news[0].image_url}} style={styles.newsImage}/>
                    <Text>{news[0].content}</Text>
                </View>
            </ScrollView>
        )}
        </>
    )
}

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainer: {
        marginHorizontal: 20,
        paddingBottom: 30,
    },
    newsImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    }
})
