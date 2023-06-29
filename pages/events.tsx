import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AuctionEvent {
  _id: string;
  title: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<AuctionEvent[]>([]);

  useEffect(() => {
    axios.get('/api/auctionEvent')
      .then(response => setEvents(response.data.data))
      .catch(error => console.error(error));
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
    </div>
  );
}