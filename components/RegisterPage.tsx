
import React from 'react';
import { AuthForm } from './AuthForm';

interface RegisterPageProps {
  onRegister: (username: string, password_raw: string) => Promise<void>;
  onNavigateToLogin: () => void;
  errorMessage: string | null;
  isLoading: boolean;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigateToLogin, errorMessage, isLoading }) => {
  return (
    <AuthForm
      formType="register"
      onSubmit={onRegister}
      buttonText="Register"
      errorMessage={errorMessage}
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
          <button
            onClick={onNavigateToLogin}
            className="font-medium text-primary-600 hover:text-primary-500"
            disabled={isLoading}
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </AuthForm>
  );
};
    