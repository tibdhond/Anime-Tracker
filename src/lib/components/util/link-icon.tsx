import {useCallback} from "react";
import {Alert, Linking, Pressable, View, ViewProps} from "react-native";
import {listStyles} from "@/lib/styles/list-styles";
import {Image, ImageSource} from "expo-image";


type LinkIconProps = ViewProps & {
    url: string,
    src: ImageSource,
}
export const LinkIcon = ({url, src, children, style, ...props}: LinkIconProps)  => {
    const onPress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
    return <Pressable onPress={onPress}>
        <View {...props} style={[listStyles.icon, style]}>
            <Image style={listStyles.icon} source={src}></Image>
        </View>
    </Pressable>
};