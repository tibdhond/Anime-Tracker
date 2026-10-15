import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth/AuthProvider'
import {GraphQLRequestProvider} from "@/lib/api/GraphqlProvider";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Tabs} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar hidden={true}></StatusBar>
          <AuthProvider>
              <QueryClientProvider client={queryClient}>
                  <GraphQLRequestProvider>
                      <>
                          <Stack screenOptions={{
                              headerShown: false,
                                  contentStyle: {
                                      backgroundColor: 'rgb(25, 25, 25)'
                                  }
                          }} >
                          </Stack>
                      </>
                  </GraphQLRequestProvider>
              </QueryClientProvider>
          </AuthProvider>
      </GestureHandlerRootView>
  );
}
