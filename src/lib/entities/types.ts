import {GetAiringListQuery, GetAnimeListQuery, GetNotificationsQuery} from "@/lib/api/__gen__/graphql";

type AnimePage = NonNullable<GetAnimeListQuery["Page"]>
export type AnimeList = NonNullable<AnimePage["mediaList"]>
export type AnimeElement = NonNullable<AnimeList[number]>
export type AnimeMedia = NonNullable<AnimeElement["media"]>
export type AnimeNotes = {
    "URI"?: string;
    "version"?: string;
    "offset"?: number;
}
export type StatusClass = 'upToDate' | 'notUpToDate' | 'unknown';

type AiringPage = NonNullable<GetAiringListQuery["Page"]>
export type InvertedMediaItem = NonNullable<NonNullable<AiringPage["media"]>[number]>;

type NotificationPage = NonNullable<GetNotificationsQuery["Page"]>
type NotificationList = NonNullable<NotificationPage["notifications"]>
export type ApiNotification = NonNullable<NotificationList[number]>