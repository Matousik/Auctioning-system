import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useUser } from '@/context/UserContext';
import { set } from 'mongoose';

interface ErrorResponse {
  message: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password }, 
      {
        headers: { 'Content-Type': 'application/json' }
      });

      setUser(response.data.user);
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError && axiosError.response) {
        setError(axiosError.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
