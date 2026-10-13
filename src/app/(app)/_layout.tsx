// app/(app)/_layout.tsx

import {Redirect, Stack, Tabs, useNavigationContainerRef} from "expo-router";
import {useAuth} from "@/lib/auth/AuthProvider";
import {LoadingScreen} from "@/lib/components/loading-screen";
import TabLayout from "@/lib/components/tab-layout";
import {NotificationProvider} from "@/lib/api/NotificationProvider";

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        console.log('redirecting to login');
        return <Redirect href="/login" />;
    }

    return <NotificationProvider><TabLayout></TabLayout></NotificationProvider>;
}
