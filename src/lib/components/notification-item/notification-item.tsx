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
import {useCallback, useMemo} from "react";
import {UiNotification} from "@/lib/entities/classes/notification";
import {listStyles} from "@/lib/styles/list-styles";
import {LinkItem} from "@/lib/components/util/link-text";
import {InfoText} from "@/lib/components/util/info-text";
import {LinkIcon} from "@/lib/components/util/link-icon";


function humanReadAbleTimeDelta(seconds: number): string {
    const divisors = [60, 60, 24, 7, 5, 12];
    const labels = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
    let time = seconds / 1000;
    let i = 0;

    while (time / divisors[i] >= 1) {
        time /= divisors[i];
        i++;
    }

    return `${Math.floor(time)} ${labels[i]}${time >= 2 ? 's' : ''} ago`;
}

export function NotificationListItem({notification}: { notification: UiNotification }) {
    const timeDelta: number = new Date().getTime() - notification.createdAt.getTime();
    const dateString: string = notification.createdAt.toString();

    const humanReadableDateString: string = useMemo(() => {
        return humanReadAbleTimeDelta(timeDelta);
    }, [dateString])

    const icons: Record<string, ImageSource> = {
        aniIcon: require('@/assets/expo.icon/Assets/aniIcon.png'),
        malIcon: require('@/assets/expo.icon/Assets/malicon.webp'),
    };

    return <View style={listStyles.elContainer}>
        <Image style={listStyles.titleImg} source={{uri: notification.image!}}></Image>
        <View style={listStyles.details}>
            <LinkItem url={notification.titleUrl}>
                <Text style={listStyles.name}>{notification.title}</Text>
            </LinkItem>
            <View>
                <View style={listStyles.infoEl}>
                    <InfoText>{notification.message}</InfoText>
                </View>
                <View style={[listStyles.infoEl, {alignItems: 'flex-start'}]}>
                    <InfoText>{humanReadableDateString}</InfoText>
                    <View style={{flexDirection: "row", marginTop: -5}}>
                        <LinkIcon url={notification.url} src={icons['aniIcon']} />
                        { !!notification.idMal && <LinkIcon url={`https://myanimelist.net/anime/${notification.idMal}`} src={icons['malIcon']}  />}
                    </View>
                </View>
            </View>
        </View>
    </View>
}