import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch the current user's todos from the Express backend.
 * Uses the 'sb-access-token' cookie automatically via credentials: 'include'.
 */
export const useTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
				credentials: 'include',
			});

			if (!res.ok) {
				// React Query will catch this and move to 'isError' state
				throw new Error('Failed to fetch todos');
			}

			return res.json();
		},
		// Optional: Keep data fresh for 1 minute before refetching in background
		staleTime: 1000 * 60,
		retry: false, // Don't retry on 401s
	});
};
