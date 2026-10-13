import {
    View,
    StyleSheet,
    Text,
    StyleProp,
    TextProps,
    TextStyle,
    ViewProps,
    Pressable,
    Linking,
    Alert
} from "react-native";
import {Anime} from "@/lib/entities/classes/anime";
import {Image, ImageSource} from "expo-image";
import {StatusClass} from "@/lib/entities/types";
import {useCallback} from "react";

export function AnimeListItem({anime}: { anime: Anime }) {
    const nextMsg: string = anime.nextMsg;
    const updateStatus: string = anime.updateStatus;
    const updateClass: StatusClass = anime.updateClass;

    type InfoTextProps = TextProps & {
        style?: StyleProp<TextStyle>;
    };

    const InfoTextText = ({children, style, ...props}: InfoTextProps)  => (
        <Text {...props} style={[styles.infoText, style]}>
            {children}
        </Text>
    );

    type LinkIconProps = ViewProps & {
        url: string,
        iconPath: string
    }

    const icons: Record<string, ImageSource> = {
        aniIcon: require('@/assets/expo.icon/Assets/aniIcon.png'),
        malIcon: require('@/assets/expo.icon/Assets/malicon.webp'),
    };

    const LinkIcon = ({url, iconPath, children, style, ...props}: LinkIconProps)  => {
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
                <View {...props} style={[styles.icon, style]}>
                    <Image style={styles.icon} source={icons[iconPath]}></Image>
                </View>
           </Pressable>
        };

    return <View style={styles.elContainer}>
        <View>
            <Image style={styles.titleImg} source={{uri: anime.img!}}></Image>
        </View>
        <View style={styles.details}>
            {/*/* Link **/}
            <Text style={styles.name}>{anime.title}</Text>
            <View>
                <View style={styles.infoEl}>
                        <View style={{flexDirection: 'row'}}>
                            <InfoTextText>Ep: </InfoTextText>
                            <InfoTextText>{anime.ep}</InfoTextText>
                        </View>
                        <InfoTextText style={[styles.updateStatus, styles[updateClass]]}>{updateStatus}</InfoTextText>
                </View>
                <View style={[styles.infoEl, {alignItems: 'flex-start', paddingTop: 5}]}>
                    <InfoTextText>{nextMsg}</InfoTextText>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: "row", marginTop: -5}}>
                            <LinkIcon url={"https://anilist.co/anime/"+anime.id} iconPath={'aniIcon'} />
                            <LinkIcon url={"https://myanimelist.net/anime/"+anime.idMal} iconPath={'malIcon'} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    elContainer: {
        paddingHorizontal: 5,
        paddingTop: 10,
        flexDirection: "row"
    },
    titleImg: {
        width: 122,
        height: 173,
        objectFit: "contain",
        borderRadius: 10
    },
    details: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 18,
        textOverflow: 'elipsis',
        overflow: 'hidden',
        color: '#95b6d0'
    },
    infoText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, .6)'
    },
    infoEl: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    updateStatus: {
        borderRadius: 5,
        padding: 4,
        fontWeight: "bold",
        marginBottom: -5
    },
    upToDate: {
        backgroundColor: 'green'
    },
    notUpToDate: {
        backgroundColor: 'red',
        color: '#333333'
    },
    unknown: {
        backgroundColor: 'orange'
    },
    icon: {
        height: 25,
        width: 25,
        paddingTop: 5,
        paddingRight: 10,
        borderRadius: 5
    }
});