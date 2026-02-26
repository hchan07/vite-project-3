import { useMutation } from '@tanstack/react-query';

export const useSignupMutation = () => {

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) =>  {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
				method: 'POST',
				body: JSON.stringify(credentials),
				headers: {
    			'Content-Type': 'application/json', // <--- This MUST be here				
  			},			
				credentials: 'include'
			});
			return res.json();
		},
    
    
    onError: (error) => {
      console.error('Login Error:', error.message);
    }
  });
};