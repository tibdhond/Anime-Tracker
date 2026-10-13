/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Media list watching/reading status enum. */
export type MediaListStatus =
  /** Finished watching/reading */
  | 'COMPLETED'
  /** Currently watching/reading */
  | 'CURRENT'
  /** Stopped watching/reading before completing */
  | 'DROPPED'
  /** Paused watching/reading */
  | 'PAUSED'
  /** Planning to watch/read */
  | 'PLANNING'
  /** Re-watching/reading */
  | 'REPEATING';

export type MediaSeason =
  /** Predominantly started airing between October and November */
  | 'FALL'
  /** Predominantly started airing between April and June */
  | 'SPRING'
  /** Predominantly started airing between July and September */
  | 'SUMMER'
  /** Predominantly started airing between January and March */
  | 'WINTER';

/** The current releasing status of the media */
export type MediaStatus =
  /** Ended before the work could be finished */
  | 'CANCELLED'
  /** Has completed and is no longer being released */
  | 'FINISHED'
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  | 'HIATUS'
  /** To be released at a later date */
  | 'NOT_YET_RELEASED'
  /** Currently releasing */
  | 'RELEASING';

/** Notification type enum */
export type NotificationType =
  /** A user has liked your activity */
  | 'ACTIVITY_LIKE'
  /** A user has mentioned you in their activity */
  | 'ACTIVITY_MENTION'
  /** A user has sent you message */
  | 'ACTIVITY_MESSAGE'
  /** A user has replied to your activity */
  | 'ACTIVITY_REPLY'
  /** A user has liked your activity reply */
  | 'ACTIVITY_REPLY_LIKE'
  /** A user has replied to activity you have also replied to */
  | 'ACTIVITY_REPLY_SUBSCRIBED'
  /** An anime you are currently watching has aired */
  | 'AIRING'
  /** A user's character submission has been accepted, partially accepted, or rejected */
  | 'CHARACTER_SUBMISSION_UPDATE'
  /** A user has followed you */
  | 'FOLLOWING'
  /** An anime or manga has had a data change that affects how a user may track it in their lists */
  | 'MEDIA_DATA_CHANGE'
  /** An anime or manga on the user's list has been deleted from the site */
  | 'MEDIA_DELETION'
  /** Anime or manga entries on the user's list have been merged into a single entry */
  | 'MEDIA_MERGE'
  /** A user's submission has been accepted, partially accepted, or rejected */
  | 'MEDIA_SUBMISSION_UPDATE'
  /** A new anime or manga has been added to the site where its related media is on the user's list */
  | 'RELATED_MEDIA_ADDITION'
  /** A user's staff submission has been accepted, partially accepted, or rejected */
  | 'STAFF_SUBMISSION_UPDATE'
  /** A user has liked your forum comment */
  | 'THREAD_COMMENT_LIKE'
  /** A user has mentioned you in a forum comment */
  | 'THREAD_COMMENT_MENTION'
  /** A user has replied to your forum comment */
  | 'THREAD_COMMENT_REPLY'
  /** A user has liked your forum thread */
  | 'THREAD_LIKE'
  /** A user has commented in one of your subscribed forum threads */
  | 'THREAD_SUBSCRIBED';

export type AnimeListFieldsFragment = { id: number, progress: number | null, notes: string | null, updatedAt: number | null, media: { id: number, idMal: number | null, episodes: number | null, status: MediaStatus | null, title: { userPreferred: string | null } | null, nextAiringEpisode: { episode: number, timeUntilAiring: number } | null, coverImage: { medium: string | null } | null, endDate: { year: number | null, month: number | null } | null } | null };

export type AnimeFieldsFragment = { id: number, idMal: number | null, season: MediaSeason | null, episodes: number | null, status: MediaStatus | null, title: { userPreferred: string | null } | null, nextAiringEpisode: { episode: number, timeUntilAiring: number } | null, coverImage: { medium: string | null } | null, startDate: { year: number | null, month: number | null, day: number | null } | null, endDate: { year: number | null, month: number | null } | null, mediaListEntry: { id: number, status: MediaListStatus | null, progress: number | null, notes: string | null, updatedAt: number | null } | null };

export type GetAnimeListQueryVariables = Exact<{
  id: number;
}>;


export type GetAnimeListQuery = { Page: { mediaList: Array<{ id: number, progress: number | null, notes: string | null, updatedAt: number | null, media: { id: number, idMal: number | null, episodes: number | null, status: MediaStatus | null, title: { userPreferred: string | null } | null, nextAiringEpisode: { episode: number, timeUntilAiring: number } | null, coverImage: { medium: string | null } | null, endDate: { year: number | null, month: number | null } | null } | null } | null> | null } | null };

export type GetAiringListQueryVariables = Exact<{
  season?: MediaSeason | null | undefined;
}>;


export type GetAiringListQuery = { Page: { media: Array<{ id: number, idMal: number | null, season: MediaSeason | null, episodes: number | null, status: MediaStatus | null, title: { userPreferred: string | null } | null, nextAiringEpisode: { episode: number, timeUntilAiring: number } | null, coverImage: { medium: string | null } | null, startDate: { year: number | null, month: number | null, day: number | null } | null, endDate: { year: number | null, month: number | null } | null, mediaListEntry: { id: number, status: MediaListStatus | null, progress: number | null, notes: string | null, updatedAt: number | null } | null } | null> | null } | null };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { Page: { notifications: Array<
      | { __typename: 'ActivityLikeNotification', type: NotificationType | null, createdAt: number | null, activityId: number, user: { name: string, avatar: { large: string | null } | null } | null }
      | { __typename: 'ActivityMentionNotification' }
      | { __typename: 'ActivityMessageNotification', type: NotificationType | null, createdAt: number | null, activityId: number, user: { name: string, avatar: { large: string | null } | null } | null }
      | { __typename: 'ActivityReplyLikeNotification', type: NotificationType | null, createdAt: number | null, activityId: number, user: { name: string, avatar: { large: string | null } | null } | null }
      | { __typename: 'ActivityReplyNotification', type: NotificationType | null, createdAt: number | null, activityId: number, user: { name: string, avatar: { large: string | null } | null } | null }
      | { __typename: 'ActivityReplySubscribedNotification' }
      | { __typename: 'AiringNotification', type: NotificationType | null, episode: number, createdAt: number | null, media: { id: number, idMal: number | null, title: { userPreferred: string | null } | null, coverImage: { medium: string | null } | null } | null }
      | { __typename: 'CharacterSubmissionUpdateNotification' }
      | { __typename: 'FollowingNotification' }
      | { __typename: 'MediaDataChangeNotification' }
      | { __typename: 'MediaDeletionNotification' }
      | { __typename: 'MediaMergeNotification' }
      | { __typename: 'MediaSubmissionUpdateNotification' }
      | { __typename: 'RelatedMediaAdditionNotification', type: NotificationType | null, createdAt: number | null, media: { id: number, idMal: number | null, title: { userPreferred: string | null } | null, coverImage: { medium: string | null } | null } | null }
      | { __typename: 'StaffSubmissionUpdateNotification' }
      | { __typename: 'ThreadCommentLikeNotification' }
      | { __typename: 'ThreadCommentMentionNotification' }
      | { __typename: 'ThreadCommentReplyNotification' }
      | { __typename: 'ThreadCommentSubscribedNotification' }
      | { __typename: 'ThreadLikeNotification' }
     | null> | null } | null };

export const AnimeListFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeListFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nextAiringEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"timeUntilAiring"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}}]}}]}}]} as unknown as DocumentNode<AnimeListFieldsFragment, unknown>;
export const AnimeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nextAiringEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"timeUntilAiring"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaListEntry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AnimeFieldsFragment, unknown>;
export const GetAnimeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnimeList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"CURRENT"}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ANIME"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeListFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeListFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nextAiringEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"timeUntilAiring"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnimeListQuery, GetAnimeListQueryVariables>;
export const GetAiringListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAiringList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaSeason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ANIME"}},{"kind":"Argument","name":{"kind":"Name","value":"status_in"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"RELEASING"},{"kind":"EnumValue","value":"NOT_YET_RELEASED"}]}},{"kind":"Argument","name":{"kind":"Name","value":"startDate_greater"},"value":{"kind":"IntValue","value":"2000"}},{"kind":"Argument","name":{"kind":"Name","value":"onList"},"value":{"kind":"BooleanValue","value":true}},{"kind":"Argument","name":{"kind":"Name","value":"season"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"START_DATE"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nextAiringEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"timeUntilAiring"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaListEntry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAiringListQuery, GetAiringListQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetNotificationCount"},"value":{"kind":"BooleanValue","value":false}},{"kind":"Argument","name":{"kind":"Name","value":"type_in"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"ACTIVITY_MESSAGE"},{"kind":"EnumValue","value":"ACTIVITY_REPLY"},{"kind":"EnumValue","value":"FOLLOWING"},{"kind":"EnumValue","value":"ACTIVITY_MENTION"},{"kind":"EnumValue","value":"THREAD_COMMENT_MENTION"},{"kind":"EnumValue","value":"THREAD_SUBSCRIBED"},{"kind":"EnumValue","value":"THREAD_COMMENT_REPLY"},{"kind":"EnumValue","value":"AIRING"},{"kind":"EnumValue","value":"ACTIVITY_LIKE"},{"kind":"EnumValue","value":"ACTIVITY_REPLY_LIKE"},{"kind":"EnumValue","value":"THREAD_LIKE"},{"kind":"EnumValue","value":"THREAD_COMMENT_LIKE"},{"kind":"EnumValue","value":"ACTIVITY_REPLY_SUBSCRIBED"},{"kind":"EnumValue","value":"RELATED_MEDIA_ADDITION"},{"kind":"EnumValue","value":"MEDIA_MERGE"},{"kind":"EnumValue","value":"MEDIA_DELETION"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AiringNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActivityMessageNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"large"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActivityReplyLikeNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"large"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActivityReplyNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"large"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActivityLikeNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"large"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RelatedMediaAdditionNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idMal"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPreferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;