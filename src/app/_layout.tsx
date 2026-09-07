import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth/AuthProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
      <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Stack />
          </QueryClientProvider>
      </AuthProvider>
  );
}
