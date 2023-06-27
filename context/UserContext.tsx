import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface UserContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await axios.get('/api/user');
          setUser(res.data.user);
        } catch (error) {
          setUser(null);
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
