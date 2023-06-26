import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/signup', { email, password });
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError && axiosError.response) {
        setError(axiosError.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
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
        <input
          type="role"
          placeholder="Role (admin or user)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupPage;
