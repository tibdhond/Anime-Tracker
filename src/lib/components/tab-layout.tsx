import {router, TabNavigationState, withLayoutContext} from 'expo-router';
import {
    createMaterialTopTabNavigator, MaterialTopTabBar, MaterialTopTabBarProps,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions
} from "expo-router/js-top-tabs";
import {AntDesign} from "@react-native-vector-icons/ant-design/";
import {MaterialIcons} from "@react-native-vector-icons/material-icons/";
import {NavigationRoute, ParamListBase} from "expo-router/build/react-navigation";
import {NotificationContextValue, useNotificationContext} from "@/lib/api/NotificationProvider";
import {BadgedBox, Badge} from "@expo/ui/jetpack-compose";
import {Pressable, Text} from "react-native";
import {Host} from "@expo/ui/jetpack-compose";
import {size, clip, Shapes} from '@expo/ui/jetpack-compose/modifiers';
import {RefObject, useCallback, useRef} from "react";
import {tap} from "lodash-es";
import {easterEggClicker} from "@/lib/helpers/easter-egg-clicker";

const { Navigator } = createMaterialTopTabNavigator();
type MaterialTopTabOptions = MaterialTopTabNavigationOptions & {
    href?: string | null;
};
const MaterialTopTabs = withLayoutContext<
    MaterialTopTabOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

function FilteredTabBar(props: MaterialTopTabBarProps) {
    const visibleRoutes = props.state.routes.filter((route: NavigationRoute<ParamListBase, string>) => {
        const options = props.descriptors[route.key].options as MaterialTopTabOptions;
        return options.href !== null;
    });

    return (
        <MaterialTopTabBar
            {...props}
            state={{
                ...props.state,
                routes: visibleRoutes,
                index: Math.min(props.state.index, visibleRoutes.length - 1),
            }}
        />
    );
}

export default function TabLayout() {
    const notificationContext: NotificationContextValue | undefined = useNotificationContext();
    const newNotificationCount: number = notificationContext?.newNotificationCount ?? 0;
    const notificationCountString: string = newNotificationCount > 9 ? '9+' : String(newNotificationCount);

    const onEasterEggReached: () => void  = easterEggClicker(() => {
        router.replace('/loading-view');
    })

    return (
        <MaterialTopTabs
            tabBarPosition="bottom"
            tabBar={(props: MaterialTopTabBarProps) => <FilteredTabBar {...props} />}
            screenOptions={{
                swipeEnabled: true,
                sceneStyle: { backgroundColor: 'rgb(25, 25, 25)'},
                tabBarStyle: { backgroundColor: 'rgb(25, 25, 25)'},
                tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                tabBarActiveTintColor: '#95b6d0',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, .6)',
                tabBarLabelStyle: { fontSize: 11 },
                tabBarItemStyle: {
                    paddingTop: 5,
                    paddingBottom: 15,
                }
            }}
        >
            <MaterialTopTabs.Screen name="current" options={{
                title: "Current",
                tabBarIcon: ({color}) => (
                    <AntDesign name='play-circle' color={color} size={24}/>
                )
            }}/>
            <MaterialTopTabs.Screen name="catchup" options={{
                title: "Catchup",
                tabBarIcon: ({color}) => (
                    <MaterialIcons name='history' color={color} size={24}/>
                )
            }}/>
            <MaterialTopTabs.Screen name="airing" options={{
                title: "Airing",
                tabBarIcon: ({color}) => (
                    <MaterialIcons name='live-tv' color={color} size={24}/>
                )
            }}/>
            <MaterialTopTabs.Screen
                name="notifications"
                listeners={{tabPress: () => onEasterEggReached()}}
                options={{
                title: "Notifications",
                tabBarIcon: ({color}) => (
                    <Host matchContents>
                        <BadgedBox>
                            <BadgedBox.Badge>
                                {newNotificationCount > 0 ? (
                                    <Badge modifiers={[size(18, 18), clip(Shapes.Circle)]} containerColor="red">
                                        <Text style={{textAlign: 'center', fontSize: 8, lineHeight: 9}}>{notificationCountString}</Text>
                                    </Badge>
                                ) : null}
                            </BadgedBox.Badge>
                            <MaterialIcons name={newNotificationCount > 0 ? 'notifications-active' : 'notifications'} color={color} size={24}/>
                        </BadgedBox>
                    </Host>
                )
            }}/>
        <MaterialTopTabs.Screen name="index" options={{ href: null }}/>
        </MaterialTopTabs>
    );
}