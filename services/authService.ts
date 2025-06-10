
import { User, Comment } from '../types';

const USERS_KEY = 'app_users';
const COMMENTS_KEY = 'app_comments';
const LOGGED_IN_USER_KEY = 'app_current_user_session'; // Using sessionStorage for session-based login

// Helper to get users from localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Helper to get comments from localStorage
const getComments = (): Comment[] => {
  const commentsJson = localStorage.getItem(COMMENTS_KEY);
  return commentsJson ? JSON.parse(commentsJson) : [];
};

// Helper to save comments to localStorage
const saveComments = (comments: Comment[]): void => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// Basic password hashing simulation (DO NOT USE IN PRODUCTION)
// In a real app, use a strong hashing library like bcrypt.
const simpleHash = (password: string): string => {
  // This is a placeholder and not secure.
  // For demo purposes, we'll just prepend a string.
  return `hashed_${password}`;
};


export const authService = {
  registerUser: async (username: string, password_raw: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate API delay
        const users = getUsers();
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
          reject(new Error('User already registered.'));
          return;
        }
        const password_hash = simpleHash(password_raw);
        const newUser: User = { id: Date.now().toString(), username, password_hash };
        users.push(newUser);
        saveUsers(users);
        resolve(newUser);
      }, 500);
    });
  },

  loginUser: async (username: string, password_raw: string): Promise<User> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => { // Simulate API delay
            const users = getUsers();
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
            const password_hash = simpleHash(password_raw);
            if (user && user.password_hash === password_hash) {
                // Return a copy of user without password_hash for security if needed,
                // but for this example, the full user object is fine for client-side state.
                resolve(user);
            } else {
                reject(new Error('Invalid username or password.'));
            }
        }, 500);
    });
  },

  setLoggedInUser: (user: User): void => {
    sessionStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
  },

  getLoggedInUser: (): User | null => {
    const userJson = sessionStorage.getItem(LOGGED_IN_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  clearLoggedInUser: (): void => {
    sessionStorage.removeItem(LOGGED_IN_USER_KEY);
  },

  fetchComments: async (): Promise<Comment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate API delay
            resolve(getComments().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }, 300);
    });
  },

  addComment: async (user: User, text: string): Promise<Comment> => {
     return new Promise((resolve) => {
        setTimeout(() => { // Simulate API delay
            const comments = getComments();
            const newComment: Comment = {
                id: Date.now().toString(),
                userId: user.id,
                username: user.username,
                text,
                timestamp: new Date().toISOString(),
            };
            comments.push(newComment);
            saveComments(comments);
            resolve(newComment);
        }, 300);
    });
  },
};
    