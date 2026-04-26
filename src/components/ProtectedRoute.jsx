import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, authLoading, children }) {
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-200 pt-[96px] text-center text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
