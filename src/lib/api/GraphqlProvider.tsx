import { GraphQLClient } from "graphql-request";
import {createContext, ReactNode, useContext, useMemo} from "react";
import {useAuth, AuthContextValue} from "@/lib/auth/AuthProvider";
import {getSdk, Sdk} from "@/lib/api/__gen__/plugins/graphql-request";

const GraphQLContext = createContext<Sdk | undefined>(undefined);

export const useGraphQLContext = () => useContext(GraphQLContext);

export const GraphQLRequestProvider = ({ children }: { children?: ReactNode }) => {
    const endpoint = 'https://graphql.anilist.co/';
    const { accessToken }: AuthContextValue = useAuth();

    const graphQLClient = useMemo(() => new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    }), [accessToken]);
    const sdk = getSdk(graphQLClient);

    return <GraphQLContext.Provider value={sdk}>{children}</GraphQLContext.Provider>
};