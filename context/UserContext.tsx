/**
 * This file defines the context for user management in the application.
 * 
 * It exports two main entities:
 * 
 * - `UserProvider`: A React component that should wrap any part of the app that needs access to the user context. 
 *   It provides the current user and a setter function to update the current user.
 * 
 * - `useUser`: A custom React hook that allows child components to access the user context. It returns an object 
 *   with the current user and the setter function.
 * 
 * The user is initially fetched from the '/api/user' endpoint when the `UserProvider` is first rendered.
 * If the fetch fails with a 401 status, it means the user is not authenticated, and the user is set to null.
 * Any other error during fetch is passed to the `handleError` function.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '@/middlewares/fetchApiHandler';

interface UserContextObject {
  email: string;
  role: string;
  _id: string;
}

interface UserContextProps {
  user: UserContextObject | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextObject | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<UserContextObject | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await fetchApi('/api/user', 'GET');
          setUser(res.data.user);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.error('An unknown error happened.');
            }
      }
      };
  
      getUser();
    }, []);

    useEffect(() => {
      console.log("Context user change: " + user?.email);
    }, [user]);    
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };  

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
