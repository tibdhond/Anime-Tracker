import {useAuth} from "@/lib/auth/AuthProvider";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {View} from "react-native";
import {Redirect} from "expo-router";

export default function Login() {
    const {isAuthenticated, login} = useAuth();

    if (isAuthenticated) {
        return <Redirect href="/current" />;
    }

    login();

    return (
        <LoadingScreen></LoadingScreen>
    )
}