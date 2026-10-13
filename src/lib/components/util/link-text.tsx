import {useCallback} from "react";
import {Alert, Linking, Pressable, PressableProps} from "react-native";

type LinkItemProps = PressableProps & {
    url: string,
}
export const LinkItem = ({url, children}: LinkItemProps)  => {
    const onPress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
    return <Pressable onPress={onPress}>
        {children}
    </Pressable>
};