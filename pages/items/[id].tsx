import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AuctionItem {
  _id: string;
  title: string;
  description: string;
  startPrice: number;
  currentPrice: number;
}

export default function ItemDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState<AuctionItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/auctionItem/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setItem(data.data);
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

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Počáteční cena: {item.startPrice}</p>
      <p>Nejvyšší příhoz: {item.currentPrice}</p>
    </div>
  );
}
