import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { fetchApi } from '@/middlewares/fetchApiHandler';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchApi('/api/login', 'POST', { email, password });
      setUser(response.user);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error('An unknown eror happened.')
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
