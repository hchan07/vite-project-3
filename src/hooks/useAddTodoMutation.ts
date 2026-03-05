import { useMutation } from '@tanstack/react-query';

export type Todo = {
  id: string;
  user_id: string;
  task: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
};

export const useAddTodoMutation = () => {
	
  return useMutation({
    mutationFn: async (task: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        // 'include' sends cookies/auth headers even for cross-origin requests
        // 'same-origin' is the default and works if the API is on the same domain
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create todo');
      }

      return response.json() as Promise<Todo>;
    },
		onError: (error) => {
      console.error('Login Error:', error.message);
    },

  });
};