import axios, { AxiosError } from "axios";

export function handleError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    // handle axios error
    console.error(`Axios error: ${axiosError.message}`);
    if (axiosError.response) {
      console.error(`Status: ${axiosError.response.status}`);
      console.error(`Data: ${JSON.stringify(axiosError.response.data)}`);
    }
  } else if (error instanceof Error) {
    // handle general error
    console.error(`General error: ${error.message}`);
    console.error(`Stack trace: ${error.stack}`);
  } else {
    console.error('An unknown error occurred.');
  }
}
