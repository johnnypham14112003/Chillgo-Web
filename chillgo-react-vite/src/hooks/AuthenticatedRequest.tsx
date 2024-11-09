// src/hooks/useAuthenticatedRequest.ts
import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseAuthenticatedRequestResult<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  sendRequest: (url: string, method: string, body?: unknown) => Promise<void>;
}

export function useAuthenticatedRequest<T>(): UseAuthenticatedRequestResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { idToken } = useAuth();

  const sendRequest = useCallback(async (url: string, method: string, body?: unknown) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!idToken) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result as T);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [idToken]);

  return { isLoading, error, data, sendRequest };
}