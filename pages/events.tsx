import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AuctionEvent {
  _id: string;
  title: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<AuctionEvent[]>([]);

  useEffect(() => {
    fetch('/api/auctionEvent')
      .then(response => response.json())
      .then(data => setEvents(data.data));
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