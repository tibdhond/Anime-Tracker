import {useAuth} from "@/lib/auth/AuthProvider";
import {LoadingScreen} from "@/lib/components/loading-screen";
import {router} from "expo-router";
import {RefObject, useEffect, useRef} from "react";

export default function Login() {
    const {isAuthenticated, isLoading, login} = useAuth();
    const hasRedirected: RefObject<boolean> = useRef(false);

    useEffect(() => {
        if (hasRedirected.current || isLoading){
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