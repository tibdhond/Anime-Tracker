import { GraphQLClient } from "graphql-request";
import { createContext, ReactNode, useContext } from "react";
import {getSdk, Sdk} from "@/lib/api/__gen__/plugins/graphql-request";
import {getAccessToken} from "@/lib/auth/storage";

const GraphQLContext = createContext<Sdk | undefined>(undefined);

export const useGraphQLContext = () => useContext(GraphQLContext);

export const GraphQLRequestProvider = ({ children }: { children?: ReactNode }) => {
    // Lambda getter + useMemo to create client
    const  = getAccessToken()

    const endpoint = 'https://graphql.anilist.co/';
    const graphQLClient = new GraphQLClient(endpoint);
    const sdk = getSdk(graphQLClient);

    return <GraphQLContext.Provider value={sdk}>{children}</GraphQLContext.Provider>

};