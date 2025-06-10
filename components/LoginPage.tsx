
import React from 'react';
import { AuthForm } from './AuthForm';

interface LoginPageProps {
  onLogin: (username: string, password_raw: string) => Promise<void>;
  onNavigateToRegister: () => void;
  errorMessage: string | null;
  successMessage: string | null;
  isLoading: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister, errorMessage, successMessage, isLoading }) => {
  return (
    <AuthForm
      formType="login"
      onSubmit={onLogin}
      buttonText="Sign In"
      errorMessage={errorMessage}
      successMessage={successMessage}
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
          <button
            onClick={onNavigateToRegister}
            className="font-medium text-primary-600 hover:text-primary-500"
            disabled={isLoading}
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </AuthForm>
  );
};
    