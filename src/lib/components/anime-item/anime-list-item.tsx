import {
    View,
    StyleSheet,
    Text,
} from "react-native";
import {Anime} from "@/lib/entities/classes/anime";
import {Image, ImageSource} from "expo-image";
import {StatusClass} from "@/lib/entities/types";
import {listStyles} from "@/lib/styles/list-styles";
import {LinkIcon} from "@/lib/components/util/link-icon";
import {InfoText} from "@/lib/components/util/info-text";

export function AnimeListItem({anime}: { anime: Anime }) {
    const nextMsg: string = anime.nextMsg;
    const updateStatus: string = anime.updateStatus;
    const updateClass: StatusClass = anime.updateClass;

    const icons: Record<string, ImageSource> = {
        aniIcon: require('@/assets/expo.icon/Assets/aniIcon.png'),
        malIcon: require('@/assets/expo.icon/Assets/malicon.webp'),
    };

    return <View style={listStyles.elContainer}>
        <Image style={listStyles.titleImg} source={{uri: anime.img!}}></Image>
        <View style={listStyles.details}>
            {/*/* Link **/}
            <Text style={listStyles.name}>{anime.title}</Text>
            <View>
                <View style={listStyles.infoEl}>
                        <View style={{flexDirection: 'row'}}>
                            <InfoText>Ep: </InfoText>
                            <InfoText>{anime.ep}</InfoText>
                        </View>
                        <InfoText style={[styles.updateStatus, styles[updateClass]]}>{updateStatus}</InfoText>
                </View>
                <View style={[listStyles.infoEl, {alignItems: 'flex-start', paddingTop: 5}]}>
                    <InfoText>{nextMsg}</InfoText>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: "row", marginTop: -5}}>
                            <LinkIcon url={"https://anilist.co/anime/"+anime.id} src={icons['aniIcon']} />
                            <LinkIcon url={"https://myanimelist.net/anime/"+anime.idMal} src={icons['malIcon']} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
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
});