import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Customer } from '@types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '@services';
import axios from 'axios';

type AuthContextProps = PropsWithChildren<any>;

type AuthContextType = {
  user: Customer | null;
  token: string;
  handleSetToken: (value: string) => void;
  handleSetUser: (value: Customer) => void;
  handleLogout: () => void;
};

const initialStates: AuthContextType = {
  user: null,
  token: '',
  handleSetToken: () => {},
  handleSetUser: () => {},
  handleLogout: () => {}
};

export const AuthContext = createContext<AuthContextType>(initialStates);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['verifyUser'],
    queryFn: verifyUser,
    retry: false
  });

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setUser(data.data.data);
      navigate('/');
    } else if (!isLoading && isError) {
      navigate('/login');
    }
  }, [isLoading, isError, data, isSuccess]);

  const handleSetToken = (value: string) => {
    window.localStorage.setItem('product_token', value);
    setToken(value);
    axios.defaults.headers.common.authorization = `Bearer ${value}`;
  };

  const handleSetUser = (value: Customer) => {
    setUser(value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('product_token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleSetToken,
        handleSetUser,
        handleLogout
      }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
