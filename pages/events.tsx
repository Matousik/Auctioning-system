import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/middlewares/fetchApiHandler';

interface AuctionEvent {
  _id: string;
  title: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<AuctionEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi('/api/auctionEvent', 'GET');
        setEvents(response.data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error('An unknown error happened.')
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Auction Events</h1>
      {events.map(event => (
        <div key={event._id}>
          <Link href={`/events/${event._id}`}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event._id}</p>
          </Link>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}