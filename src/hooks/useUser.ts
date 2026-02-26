import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: 'include',
      });
      
      if (!res.ok) {
        // If 401, return null instead of throwing an error 
        // to avoid React Query's default retry behavior
        return null; 
      }
      
      const data = await res.json();
      return data.authenticated ? data.user : null;
    },
    // Keep the data for 5 minutes so switching pages doesn't trigger a refetch
    staleTime: 5 * 60 * 1000, 
    retry: false, // Don't retry on 401s
  });
};