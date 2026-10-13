import {FlatList} from "react-native";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {useGraphQLContext} from "@/lib/api/GraphqlProvider";
import {AuthContextValue, useAuth} from "@/lib/auth/AuthProvider";
import {Anime} from "@/lib/entities/classes/anime";
import {useMemo} from "react";
import {parseAiring, parseAnimeList} from "@/lib/helpers/parse-anime-list";
import {AnimeListItem} from "@/lib/components/anime-item/anime-list-item";
import {orderBy} from 'lodash-es';
import {MediaSeason} from "@/lib/api/__gen__/plugins/graphql-request";

const month = new Date().getMonth();
const day = new Date().getUTCDate();
const dayId = month * 31 + day;

let season: MediaSeason;
if (dayId >= 82 && dayId < 185) {
    season = "SPRING";
} else if (dayId >= 185 && dayId < 268) {
    season = "SUMMER";
} else if (dayId >= 268 && dayId < 361) {
    season = "FALL";
} else {
    season = "WINTER";
}

export default function Airing() {
    const graphQL = useGraphQLContext();
    const { userId }: AuthContextValue = useAuth();
    const queryClient: QueryClient = useQueryClient();

    const { data, isPending } = useQuery({
        queryKey: ['airing', userId],
        queryFn: async () => {
            return graphQL!.GetAiringList({season});
        },
        enabled: !!graphQL && !!userId
    }, queryClient);

    const animeList: Anime[] = useMemo(() => {
        if (!data) {
            return [];
        }

        let animeList: Anime[] = parseAiring(data);
        animeList = orderBy(animeList, ['behind', (anime: Anime) => !anime.air,  'air'], ['desc', 'asc', 'asc'])

        return animeList;
    }, [data]);

    if (isPending) {
        return <LoadingScreen></LoadingScreen>
    }


    return <FlatList
        style={{marginTop: 10}}
        data={animeList}
        renderItem={({item}) => <AnimeListItem anime={item} key={item.id}/> }
        keyExtractor={anime => "" + anime.id}
    >
    </FlatList>
}