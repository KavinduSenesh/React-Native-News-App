import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import {useEffect, useState} from "react";
import {NewsDataType} from "@/types";
import Loading from "@/components/Loading";
import {Colors} from "@/constants/Colors";
import Moment from "moment";

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
            title: "",
        }}
        />
        {isLoading ? (
            <Loading size={'large'}/>
        ) : (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                <View>
                    <Text style={styles.title}>{news[0].title}</Text>
                    <View style={styles.newsInfoWrapper}>
                        <Text style={styles.newsInfo}>
                            {Moment(news[0].pubDate).format('MMMM DD, hh:mm a')}
                        </Text>
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
                    </View>
                    <Image source={{uri: news[0].image_url}} style={styles.newsImage}/>
                    {news[0].content ? (
                        <Text style={styles.newsContent}>{news[0].content}</Text>
                    ) : (
                        <Text style={styles.newsContent}>{news[0].description}</Text>
                    )}
                    <Text style={styles.newsContent}>{news[0].content}</Text>
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
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginVertical: 16,
        letterSpacing: 0.6
    },
    newsImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    newsInfoWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 20,
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22,
    }
})
