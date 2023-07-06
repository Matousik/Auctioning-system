import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

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

    try {
      // Make API request
      const res = await axios.post('/api/auctionEvent', {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    
      // Handle the result of the API call
      if (!res.data.success) {
        setErrorMessage(res.data.message);
        return;
      }
    
      // Redirect to the events page
      router.push('/events');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { message } = error.response.data;
          setErrorMessage(message);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage('No response received from server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(error.message);
        }
      } else {
        // Unknown error occurred
        setErrorMessage('An unexpected error occurred.');
      }
    }  };

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
