import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {useAuth, AuthContextValue} from "@/lib/auth/AuthProvider";
import {useGraphQLContext} from "@/lib/api/GraphqlProvider";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {UiNotification} from "@/lib/entities/classes/notification";
import {parseNotification} from "@/lib/helpers/parse-notifications";
import {ApiNotification} from "@/lib/entities/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationContextValue {
    notifications: UiNotification[],
    newNotificationCount: number,
    setLastChecked: Dispatch<SetStateAction<number>>
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children?: ReactNode }) => {
    const graphQL = useGraphQLContext();
    const { userId }: AuthContextValue = useAuth();
    const queryClient: QueryClient = useQueryClient();
    const [lastChecked, setLastChecked] = useState(Date.now());

    const { data } = useQuery({
        queryKey: ['notifications', userId],
        queryFn: async () => {
            return graphQL!.GetNotifications();
        },
        enabled: !!graphQL && !!userId
    }, queryClient);

    const notificationList: UiNotification[] = useMemo(() => {
        if (!data?.Page?.notifications) {
            return [];
        }

        let notificationList: UiNotification[] = data.Page.notifications
            .filter((notification: (ApiNotification & {episode?: number}) | null) => !notification?.episode || notification.episode === 1)
            .map((notification) => parseNotification(notification as ApiNotification))
            .filter(notification => !!notification);

        return notificationList;
    }, [data]);

    useEffect(() => {
        let mounted: boolean = true;
        const loadTimestamp = async () => {
            try {
                const storedCheck: string | null = await AsyncStorage.getItem('lastChecked');
                if (mounted) {
                    setLastChecked(storedCheck ? parseInt(storedCheck, 10) : 0);
                }
            } catch (e) {
                console.error('Failed to get lastChecked from asyncStorage', e);
            }
        }
        loadTimestamp();

        return () => {
            mounted = false
        }
    })

    let newNotificationCount: number = notificationList.filter(notification => notification.createdAt.getTime() > lastChecked).length;

    return <NotificationContext.Provider value={{notifications: notificationList, newNotificationCount, setLastChecked}}>{children}</NotificationContext.Provider>
};