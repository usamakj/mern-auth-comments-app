
import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { LockIcon } from './icons/LockIcon';

interface AuthFormProps {
  formType: 'login' | 'register';
  onSubmit: (username: string, password_raw: string) => Promise<void>;
  buttonText: string;
  errorMessage?: string | null;
  successMessage?: string | null;
  isLoading: boolean;
  children?: React.ReactNode; // For links like "Don't have an account?"
}

export const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  onSubmit,
  buttonText,
  errorMessage,
  successMessage,
  isLoading,
  children
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
        // Basic client-side validation, can be enhanced
        alert("Username and password cannot be empty.");
        return;
    }
    onSubmit(username, password);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {formType === 'login' ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username-address" className="sr-only">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username-address"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password_raw" className="sr-only">
              Password
            </label>
             <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password_raw"
                name="password_raw"
                type="password"
                autoComplete={formType === 'login' ? 'current-password' : 'new-password'}
                required
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {children} 

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Processing...' : buttonText}
          </button>
        </div>
      </form>
       <div className="text-sm text-center">
            <p className="text-gray-600">
                Note: User data is stored in browser's localStorage for demonstration.
            </p>
        </div>
    </div>
  );
};
    