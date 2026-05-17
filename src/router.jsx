import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from './store';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Onboard from './components/Onboard';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

function ProtectedRoute({ children }) {
  const user = useStore((s) => s.user);
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function AppRouter() {
  const navigate = useNavigate();
  const { setUser, setSel, logout } = useStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary name="Landing">
            <Landing onEnter={() => navigate('/auth')} />
          </ErrorBoundary>
        }
      />
      <Route
        path="/auth"
        element={
          <ErrorBoundary name="Authentication">
            <Auth
              onAuth={(u, isSignup) => {
                setUser(u);
                navigate(isSignup ? '/onboard' : '/dashboard');
              }}
            />
          </ErrorBoundary>
        }
      />
      <Route
        path="/onboard"
        element={
          <ErrorBoundary name="Onboarding">
            <Onboard
              onDone={(s) => {
                setSel(s);
                navigate('/dashboard');
              }}
            />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ErrorBoundary name="Dashboard">
              <Dashboard
                onLogout={() => {
                  logout();
                  navigate('/');
                }}
              />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
