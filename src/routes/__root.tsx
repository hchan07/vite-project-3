import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useUser } from '../hooks/useUser'; // Import your hook
import { useLogoutMutation } from '../hooks/useLogoutMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';


const RootLayout = () => {
  const { data: user, isLoading } = useUser();
  const logoutMutation = useLogoutMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
    onSuccess: () => {
      
      // Add any specific logic here
      queryClient.invalidateQueries();
      
      navigate({ to: '/' });      
    },
  });
};

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/pokemon/$id" params={{id:'1'}} className="[&.active]:font-bold">
          Pokemon
        </Link>  
        <Link to="/render" className="[&.active]:font-bold">
          Render
        </Link> 
<div className="ml-auto flex gap-4">
          {isLoading ? (
            <span className="text-xs opacity-50">Checking auth...</span>
          ) : user ? (
            // LOGGED IN STATE
            <div className="flex gap-4 items-center">
              <span className="text-sm border-r pr-4">Welcome, {user.email}</span>
              
              {/* Note: Logout should invalidate the 'user' query */}
              <button onClick={handleLogout} className="p-1 px-3 bg-blue-600 text-white rounded [&.active]:font-bold cursor-pointer">
                Logout
              </button>
            </div>
            
          ) : (
            // LOGGED OUT STATE
            <>
              <Link to="/login" className="[&.active]:font-bold">Login</Link>
              <Link to="/signup" className="p-1 px-3 bg-blue-600 text-white rounded [&.active]:font-bold">
                Get Started
              </Link>
            </>
          )}
        </div>                
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
);
};

export const Route = createRootRoute({ component: RootLayout });