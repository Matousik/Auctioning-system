import { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '../context/UserContext'; // import the useUser hook from UserContext
import axios, { AxiosError } from 'axios';

export default function Navbar() {
  const { user, setUser } = useUser(); // use the useUser hook to get the user and setUser function

  useEffect(() => {
    if (!user) {
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
    }
  }, [user, setUser]);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Domů</Link>
        </li>
        {user ? (
          <li>
            <a href="#" onClick={handleLogout}>
              Odhlásit se ({user.email})
            </a>
          </li>
        ) : (
          <>
            <li>
              <Link href="/signup">Registrace</Link>
            </li>
            <li>
              <Link href="/login">Přihlásit se</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/events">Aukce</Link>
        </li>
        {user?.role === 'admin' && (
          <li>
            <Link href="/admin/createEvent">Administrace (vytvořit aukci)</Link>
          </li>
        )}
      </ul>
    </nav>
  );

  async function handleLogout() {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (error) {
      // Handle any errors here, such as showing a notification to the user
      console.error(error);
    }
  }
  
}
