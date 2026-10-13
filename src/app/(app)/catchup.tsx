import {View, Text, FlatList} from "react-native";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {useGraphQLContext} from "@/lib/api/GraphqlProvider";
import {AuthContextValue, useAuth} from "@/lib/auth/AuthProvider";
import {Anime} from "@/lib/entities/classes/anime";
import {use, useEffect, useMemo, useState} from "react";
import {parseAnimeList} from "@/lib/helpers/parse-anime-list";
import {AnimeListItem} from "@/lib/components/anime-item/anime-list-item";
import {orderBy} from 'lodash-es';
import {useNavigationState} from "expo-router/build/react-navigation";


export default function Catchup() {
    const graphQL = useGraphQLContext();
    const { userId }: AuthContextValue = useAuth();
    const queryClient: QueryClient = useQueryClient();

    const { data, isPending } = useQuery({
        queryKey: ['watching', userId],
        queryFn: async () => {
            return graphQL!.GetAnimeList({id: parseInt(userId!)});
        },
        enabled: !!graphQL && !!userId
    }, queryClient);

    const animeList: Anime[] = useMemo(() => {
        if (!data) {
            return [];
        }

        let animeList: Anime[] = parseAnimeList(data).filter(anime => !anime.isCurrent);
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