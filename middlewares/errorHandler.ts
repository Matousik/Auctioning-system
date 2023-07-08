/**
 * This module exports a generic error handling function, 'handleError', capable of handling Axios and generic JavaScript/TypeScript errors.
 * For Axios errors, it logs the error message and details about the HTTP response (if available).
 * For general errors, it logs the error message and stack trace.
 * If the error doesn't match either of these types, it simply logs that an unknown error occurred.
 */

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
