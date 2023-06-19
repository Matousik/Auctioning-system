import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Timer from '../../components/timer';

interface AuctionEvent {
  _id: string;
  title: string;
  description: string;
  endDate: Date;
}

interface AuctionItem {
  _id: string;
  title: string;
  description: string;
  startPrice: number;
  currentPrice: number;
}

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<AuctionEvent | null>(null);
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/auctionEvent/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setEvent(data.data);
          } else {
            setError(data.message);
          }
        })
        .catch(error => {
          setError(error.message);
        });

      fetch(`/api/auctionItem?event=${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setItems(data.data);
          } else {
            setError(data.message);
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {event && (
        <>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <Timer endDate={event.endDate} />
          {/* TODO: Implement the blockage of bidding when the time is up. */}
          <h2>Items</h2>
          {items.map(item => (
            <div key={item._id}>
              <Link href={`/items/${item._id}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Počáteční cena: {item.startPrice}</p>
                <p>Nejvyšší příhoz: {item.currentPrice}</p>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
