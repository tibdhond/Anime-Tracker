// app/(app)/_layout.tsx

import {Redirect, Stack} from "expo-router";
import {useAuth} from "@/lib/auth/AuthProvider";
import {LoadingScreen} from "@/lib/components/loading-screen";

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return <Stack />;
}
