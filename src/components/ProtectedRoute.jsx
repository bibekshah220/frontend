
import { useAuth } from '../context/authContext';
import {FaSpider } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';



function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
             <FaSpider className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
        <p className='mt-4 text-gray-600'>Loading....</p>
        </div>
       
      </div>
    );
  }
}

if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace  />;
}

return children;


export default ProtectedRoute;
