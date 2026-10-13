import {StyleProp, Text, TextProps, TextStyle} from "react-native";
import {listStyles} from "@/lib/styles/list-styles";

type InfoTextProps = TextProps & {
    style?: StyleProp<TextStyle>;
};

export const InfoText = ({children, style, ...props}: InfoTextProps)  => (
    <Text {...props} style={[listStyles.infoText, style]}>
        {children}
    </Text>
);