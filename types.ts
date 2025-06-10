
export interface User {
  id: string;
  username: string;
  // For security, password_hash should be stored, not password_raw.
  // This is simplified for localStorage example.
  password_hash: string; 
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}
    