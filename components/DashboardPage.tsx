
import React from 'react';
import { User } from '../types';
import { CommentSection } from './CommentSection';
import { LogoutIcon } from './icons/LogoutIcon';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-primary-600 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.username}!</h1>
          <button
            onClick={onLogout}
            className="flex items-center text-sm font-medium text-white bg-primary-700 hover:bg-primary-800 py-2 px-4 rounded-lg transition-colors duration-150"
            title="Logout"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </header>
        
        <div className="p-6">
          <p className="text-gray-700 mb-6 text-lg">
            This is your dashboard. You can post and view comments below.
          </p>
          <CommentSection user={user} />
        </div>
      </div>
    </div>
  );
};
    