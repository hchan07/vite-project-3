import { useMutation } from '@tanstack/react-query';

export const useLogoutMutation = () => {

  return useMutation({
    mutationFn: async () =>  {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
				method: 'POST',
				headers: {
    			'Content-Type': 'application/json', // <--- This MUST be here				
  			},			
				credentials: 'include'
			});
			return res.json();
		},
    
    
    onError: (error) => {
      console.error('logout Error:', error.message);
    }
  });
};