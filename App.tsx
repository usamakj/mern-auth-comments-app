
import React, { useState, useEffect, useCallback } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { User } from './types';
import { authService } from './services/authService';

type View = 'login' | 'register' | 'dashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      setIsLoading(true);
      const user = authService.getLoggedInUser();
      if (user) {
        setCurrentUser(user);
        setCurrentView('dashboard');
      } else {
        setCurrentView('login');
      }
      setIsLoading(false);
    };
    checkLoggedInUser();
  }, []);

  const handleLogin = useCallback(async (username: string, password_raw: string) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const user = await authService.loginUser(username, password_raw);
      setCurrentUser(user);
      setCurrentView('dashboard');
      authService.setLoggedInUser(user);
    } catch (error) {
      setAuthError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (username: string, password_raw: string) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      await authService.registerUser(username, password_raw);
      setAuthSuccess('Registration successful! Please log in.');
      setCurrentView('login');
    } catch (error) {
      setAuthError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    authService.clearLoggedInUser();
    setCurrentUser(null);
    setCurrentView('login');
    setAuthError(null);
    setAuthSuccess('Successfully logged out.');
    setIsLoading(false);
  }, []);

  const navigateToRegister = useCallback(() => {
    setCurrentView('register');
    setAuthError(null);
    setAuthSuccess(null);
  }, []);

  const navigateToLogin = useCallback(() => {
    setCurrentView('login');
    setAuthError(null);
    // Keep success message if navigating from successful registration
    // setAuthSuccess(null); 
  }, []);

  if (isLoading && !currentUser && currentView !== 'dashboard') { // Show loading screen only on initial load or auth operations
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-primary-700">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center p-4">
      {currentView === 'login' && (
        <LoginPage 
          onLogin={handleLogin} 
          onNavigateToRegister={navigateToRegister} 
          errorMessage={authError}
          successMessage={authSuccess}
          isLoading={isLoading}
        />
      )}
      {currentView === 'register' && (
        <RegisterPage 
          onRegister={handleRegister} 
          onNavigateToLogin={navigateToLogin}
          errorMessage={authError}
          isLoading={isLoading}
        />
      )}
      {currentView === 'dashboard' && currentUser && (
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
    