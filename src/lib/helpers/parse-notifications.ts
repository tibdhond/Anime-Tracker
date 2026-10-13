import {ApiNotification} from "@/lib/entities/types";
import {NotificationType} from "@/lib/api/__gen__/graphql";
import {
    ActivityLikeNotification,
    ActivityMessageNotification,
    ActivityReplyLikeNotification, ActivityReplyNotification, RelatedMediaAdditionNotification
} from "@/lib/api/__gen__/plugins/graphql-request";
import {UiNotification} from "@/lib/entities/classes/notification";
import {truncate} from "@/lib/helpers/util";

type UserNotification = ActivityLikeNotification | ActivityReplyLikeNotification | ActivityMessageNotification | ActivityReplyNotification;

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function parseNotification(notification: ApiNotification): UiNotification | null {
    const type: NotificationType | null = 'type' in notification ? notification.type : null;

    switch (type) {
        case 'AIRING':
        case 'RELATED_MEDIA_ADDITION':
            return processMediaNotification(notification as RelatedMediaAdditionNotification);
        case 'ACTIVITY_LIKE':
        case 'ACTIVITY_REPLY_LIKE':
        case 'ACTIVITY_MESSAGE':
        case 'ACTIVITY_REPLY':
            return processUserNotification(notification as UserNotification);
        default:
            return null;
    }
}

function processUserNotification(notification: UserNotification): UiNotification {
    const id: number = notification.id ?? uid();
    const image: string = notification.user?.avatar?.large ?? "";
    const title: string = notification.user?.name ?? "";
    const titleUrl: string = `https://anilist.co/user/${notification.user?.name}`;
    const url: string = `https://anilist.co/activity/${notification.activityId}`;
    const createdAt: Date = new Date((notification.createdAt ?? 0) * 1000);

    let message: string = '';
    if (notification.type === 'ACTIVITY_LIKE') {
        message = 'liked your activity';
    } else if (notification.type === 'ACTIVITY_REPLY_LIKE') {
        message = 'liked your reply';
    } else if (notification.type === 'ACTIVITY_MESSAGE') {
        message = 'sent you a message';
    } else if (notification.type === 'ACTIVITY_REPLY') {
        message = 'replied to your activity';
    }

    return new UiNotification(id, image, title, titleUrl, url, createdAt, message);
}

function processMediaNotification(notification: RelatedMediaAdditionNotification): UiNotification {
    const id: number = notification.id ?? uid();
    const image: string = notification.media?.coverImage?.medium ?? '';
    const title: string = truncate(notification.media?.title?.userPreferred ?? '', 60);
    const titleUrl: string = `https://anilist.co/anime/${notification.media?.id}`;
    const url: string = titleUrl;
    const idMal: number = notification.media?.idMal ?? 0;
    const createdAt: Date = new Date((notification.createdAt ?? 0) * 1000);

    let message: string = ''
    if (notification.type === 'AIRING') {

        message = 'Episode 1 aired';
    } else if (notification.type === 'RELATED_MEDIA_ADDITION') {
        message = 'was added to the database';
    }

    return new UiNotification(id, image, title, titleUrl, url, createdAt, message, idMal);
}