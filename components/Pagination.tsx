import {NewsDataType} from "@/types";
import {SharedValue} from "react-native-reanimated";

type Props = {
    sliderItem: NewsDataType;
    index: number;
    scrollX: SharedValue<number>;
};
