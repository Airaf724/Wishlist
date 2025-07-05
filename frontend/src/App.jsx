/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";

const App = () => {
  const { isAuthenticated, checkAuth, isCheckingAuth, user } = useAuthStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const timer = setTimeout(async () => {
          await checkAuth();
        }, 100);

        return () => clearTimeout(timer);
      } finally {
        setIsDataLoaded(true);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  const RedirectAuthenticatedUser = ({ children }) => {
    if (isDataLoaded && isAuthenticated && user) {
      return <Navigate to="/dashboard" replace />;
    }
    if (isDataLoaded) {
      return children;
    }

    return <LoadingSpinner />;
  };

  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (isDataLoaded && !isCheckingAuth) {
        if (!isAuthenticated || !user) {
          navigate("/login", { replace: true });
        }
      }
    }, [navigate, isDataLoaded, isCheckingAuth, isAuthenticated, user]);

    if (isCheckingAuth || !isDataLoaded) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated || !user) {
      return <LoadingSpinner />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist/:id"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
