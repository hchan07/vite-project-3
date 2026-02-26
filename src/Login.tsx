import { useState } from 'react';
import { useLoginMutation } from './hooks/useLoginMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type LoginFormProps =  { 
  loading: boolean; 
  email: string; 
  password: string; 
  setEmail: (value: string) => void; 
  setPassword: (value: string) => void; 
  handleLogin: (e: React.SubmitEvent<HTMLFormElement>) => void 
}
const LoginForm = ({ 
	loading, 
	email, 
	password, 
	setEmail, 
	setPassword, 
	handleLogin
} : LoginFormProps) => {
  
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold">Login</h2>
            
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
				name="email"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
				name="password"
      />

      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Login...' : 'Login'}
      </button>
    </form>
  );
};


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLoginMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

		const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
  	setLoading(true);

    loginMutation.mutate(data, {
          // Global side effects live here
    onSuccess: (data) => {
      setLoading(false);
      // Sync the 'user' query immediately
      queryClient.setQueryData(['user'], data.user);
      // Optional: invalidate to be safe
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      navigate({ to: '/' });
    },
    });
  };

  return (
    <LoginForm 
			loading={loading} 
			email={email} 
			password={password} 
			setEmail={setEmail} 
			setPassword={setPassword} 
			handleLogin={handleLogin} 
		/>
  );
};

export default Login;