import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function CreateEvent() {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage(null);

    // Make API request
    const res = await fetch('/api/auctionEvent', {
      body: JSON.stringify({
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // Handle response
    if (!res.ok) {
      const { message } = await res.json();
      setErrorMessage(message);
      return;
    }

    const result = await res.json();

    // Handle the result of the API call
    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    // Redirect to the events page
    router.push('/events');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Start Date:
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Create</button>
    </form>
  );
}
