import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Domů</Link>
        </li>
        <li>
          <Link href="/signup">Registrace</Link>
        </li>
        <li>
          <Link href="/login">Přihlásit se</Link>
        </li>
        <li>
          <Link href="/events">Aukce</Link>
        </li>
      </ul>
    </nav>
  );
}
