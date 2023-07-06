import React, { createContext, useState, useContext, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { IUserSchema } from '@/models/User';

interface UserContextProps {
  user: IUserSchema | null;
  setUser: React.Dispatch<React.SetStateAction<IUserSchema | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUserSchema | null>(null);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await axios.get('/api/user');
          setUser(res.data.user);
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            setUser(null);
          } else {
            console.error(axiosError);
          }
        }
      };
  
      getUser();
    }, []);
  
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
