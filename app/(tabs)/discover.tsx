import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import SearchBar from "@/components/SearchBar";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import newsCategoryList from "@/constants/Categories";
import CheckBox from "@/components/CheckBox";
import {useNewsCategories} from "@/hooks/useNewsCategories";

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();

  const {newsCategories, toggleNewsCategory} = useNewsCategories();


  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <SearchBar withHorizontalPadding={false}/>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox key={item.id} label={item.title} checked={item.selected} onPress={() => {
            toggleNewsCategory(item.id)
          }}/>
        ))}
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
            <CheckBox key={item.id} label={item.title} checked={item.selected} onPress={() => {
              toggleNewsCategory(item.id)
            }}/>
        ))}
      </View>

    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    marginBottom: 20,
  }
})
