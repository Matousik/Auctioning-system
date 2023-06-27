import { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '../context/UserContext'; // import the useUser hook from UserContext

export default function Navbar() {
  const { user, setUser } = useUser(); // use the useUser hook to get the user and setUser function

  useEffect(() => {
    if (!user) {
      // only fetch the user if it's not already set in the context
      const getUser = async () => {
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const { user: fetchedUser } = await res.json();
          setUser(fetchedUser);
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
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.ok) {
      setUser(null);
    }
  }
}
