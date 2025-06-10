
import React, { useState, useEffect, useCallback } from 'react';
import { User, Comment } from '../types';
import { authService } from '../services/authService';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface CommentSectionProps {
  user: User;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ user }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedComments = await authService.fetchComments();
      setComments(fetchedComments);
    } catch (e) {
      setError('Failed to load comments.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      await authService.addComment(user, newComment);
      setNewComment('');
      await fetchComments(); // Refresh comments list
    } catch (e) {
      setError('Failed to post comment.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <ChatBubbleIcon className="h-7 w-7 mr-3 text-primary-600" />
        Comments
      </h2>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      <form onSubmit={handlePostComment} className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
          rows={3}
          placeholder={`What's on your mind, ${user.username}?`}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !newComment.trim()}
          className="mt-3 w-full sm:w-auto px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {isLoading && comments.length === 0 && <p className="text-gray-500">Loading comments...</p>}
      
      <div className="space-y-6">
        {comments.length === 0 && !isLoading && <p className="text-gray-500 italic">No comments yet. Be the first to post!</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-start space-x-3">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-primary-700">{comment.username}</p>
                        <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                    </div>
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
    