import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import {NewsDataType} from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getBreakingNews();
    }, []);

  const getBreakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=lk&language=si&image=1&removeduplicate=1`;
      const response = await axios.get(url);

      console.log(response.data);
      if (response && response.data) {
          setBreakingNews(response.data.results);
          setIsLoading(false);
      }

    }catch (err: any) {
      console.log('Error Message: ', err.message);
    }
  }

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar/>
        {
            isLoading ?
                <ActivityIndicator size={'large'}/>
            :
                <BreakingNews newsList={breakingNews}/>
        }
      {/*<BreakingNews newsList={breakingNews}/>*/}
      <Categories/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
