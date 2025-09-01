
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DesacelereApp from '@/components/DesacelereApp';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <DesacelereApp />;
};

export default Index;
