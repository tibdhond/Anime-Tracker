import {clearAccessToken, getAccessToken, saveAccessToken} from "@/lib/auth/storage";
import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import {AuthError, AuthRequestPromptOptions, AuthSessionResult} from "expo-auth-session";
import {jwtDecode} from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextValue {
    isLoading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    userId: string | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
}

export function AuthProvider({children}: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    const [response, promptAsync] = requestAccessToken();

    useEffect(() => {
        async function restoreSession() {
            try {
                const token: string | null = await getAccessToken();
                if (!!token) {
                    console.log('token stored');
                    setAccessToken(token);
                    setUserId(jwtDecode(token).sub ?? null);
                }
            } finally {
                setIsLoading(false);
            }
        }
        restoreSession();
    }, []);

    useEffect(() => {
        try {
            if (!response) {
                return
            }

            if (response.type === "success") {
                const token: string = response.params.access_token;
                setAccessToken(token);
                setUserId(jwtDecode(token).sub ?? null);
                saveAccessToken(token);
            }
        } finally {
            if (response) {
                setIsLoading(false);
            }
        }
    }, [response]);

    async function login() {
        await promptAsync();
    }

    async function logout() {
        await clearAccessToken();
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated: !!accessToken,
                accessToken,
                userId,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function requestAccessToken(): [AuthSessionResult | null, (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>] {
    const CLIENT_ID: string = '49784'; // TODO: Move to config file?
    const [response, setResponse] =
        useState<AuthSessionResult | null>(null);

    const request = useMemo(() => {
        const url = new URL(
            'https://anilist.co/api/v2/oauth/authorize'
        );

        url.searchParams.set(
            'client_id',
            CLIENT_ID
        );

        url.searchParams.set(
            'response_type',
            'token'
        );

        return {
            url: url.toString(),
        };
    }, [])


    const promptAsync = useCallback(async () => {
        setResponse(null);

        return await new Promise<AuthSessionResult>((resolve) => {
            const subscription =
                Linking.addEventListener(
                    'url',
                    ({url}) => {
                        subscription.remove();

                        const authResult =
                            parseRedirectUrl(url);

                        resolve(authResult);
                        setResponse(authResult);
                    }
                );


            console.log(request.url);

            //Linking.openURL(request.url);
            WebBrowser.openBrowserAsync(request.url);
        });
    }, [request.url]);

    return [response, promptAsync]
}

function parseRedirectUrl(
    url: string
): AuthSessionResult {
    const hashIndex = url.indexOf('#');

    if (hashIndex === -1) {
        return {
            type: 'error',
            error: new AuthError({error: 'invalid_redirect'}),
            errorCode: 'invalid_redirect',
            params: {},
            authentication: null,
            url
        };
    }

    const fragment = url.slice(hashIndex + 1);

    const params = Object.fromEntries(
        new URLSearchParams(fragment)
    );

    if (params.error) {
        return {
            type: 'error',
            error: new AuthError({ error: params.error, error_description: params.error_description}),
            errorCode: params.error,
            params,
            authentication: null,
            url
        };
    }

    return {
        type: 'success',
        errorCode: null,
        params,
        authentication: null,
        url
    };
}
