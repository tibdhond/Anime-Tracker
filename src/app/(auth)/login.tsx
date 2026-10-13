import {useAuth} from "@/lib/auth/AuthProvider";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {View} from "react-native";
import {Redirect, router} from "expo-router";
import {RefObject, useEffect, useRef} from "react";

export default function Login() {
    const {isAuthenticated, login} = useAuth();
    const hasRedirected: RefObject<boolean> = useRef(false);

    useEffect(() => {
        if (hasRedirected.current){
            return;
        }

        if (isAuthenticated) {
            hasRedirected.current = true;
            router.replace('/(app)/current', {withAnchor: true})
        } else {
            login();
        }

    }, [isAuthenticated])

    return (
        <LoadingScreen></LoadingScreen>
    )
}