import {FlatList} from "react-native";
import {NotificationContextValue, useNotificationContext} from "@/lib/api/NotificationProvider";
import {UiNotification} from "@/lib/entities/classes/notification";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {NotificationListItem} from "@/lib/components/notification-item/notification-item";
import { useFocusEffect } from 'expo-router';
import {useCallback, useRef} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notifications() {
    const notificationContext: NotificationContextValue | undefined = useNotificationContext();
    const hasRunNotificationCheck = useRef(false);

    useFocusEffect(
        useCallback(() => {
            if (!notificationContext || hasRunNotificationCheck.current) {
                return;
            }

            hasRunNotificationCheck.current = true;

            console.log('triggered');
            const now: number = Date.now();
            AsyncStorage.setItem('lastChecked', now.toString());
            notificationContext.setLastChecked(now);
        }, [notificationContext])
    )

    if (!notificationContext?.notifications.length) {
        return <LoadingScreen></LoadingScreen>
    }

    const notificationList: UiNotification[] = notificationContext.notifications;

    return <FlatList
        style={{marginTop: 10}}
        data={notificationList}
        renderItem={({item}) => <NotificationListItem notification={item} key={item.id}/> }
        keyExtractor={notification => "" + notification.id}
    >
    </FlatList>
}