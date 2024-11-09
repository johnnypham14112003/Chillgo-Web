// src/hooks/useGetProfile.ts

import { useState, useEffect } from "react";
import { Customer, Profile } from "../data/types";

interface UseGetProfileResult {
  data: Profile | null;
  isLoading: boolean;
  isError: boolean;
}

export const useGetProfile = (): UseGetProfileResult => {
  const [data, setData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // Simulate an API call with a timeout
    const fetchProfile = () => {
      setIsLoading(true);
      setIsError(false);

      setTimeout(() => {
        try {
          // Simulate successful fetch with fake data
          const fakeProfile: Profile = {
            user: {
              token: "fake-token-123",
              name: "Admin User",
              email: "admin@example.com",
              role: "admin",
            },
          };
          setData(fakeProfile);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000); // 1-second delay to simulate network latency
    };

    fetchProfile();
  }, []);

  return { data, isLoading, isError };
};


interface UseGetAllAccountResult {
  data: Customer[] | null;
  isLoading: boolean;
  isError: boolean;
  total: number;
}

export const useGetAllAccount = (
  token: string,
  currentPage: number,
  pageSize: number
): UseGetAllAccountResult => {
  const [data, setData] = useState<Customer[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Simulate an API call with a timeout
    const fetchAccounts = () => {
      setIsLoading(true);
      setIsError(false);

      setTimeout(() => {
        try {
          if (!token) {
            throw new Error("Invalid token");
          }

          // Generate fake accounts
          const fakeTotal = 50; // Total number of accounts
          const fakeAccounts: Customer[] = Array.from({ length: pageSize }, (_, i) => {
            const accountNumber = (currentPage - 1) * pageSize + i + 1;
            return {
              accountId: (1000 + accountNumber).toString(),
              name: `Customer ${accountNumber}`,
              email: `customer${accountNumber}@example.com`,
              createAt: new Date(
                Date.now() - accountNumber * 86400000
              ).toISOString(), // Created days ago
              avatar: `https://i.pravatar.cc/150?img=${accountNumber}`, // Random avatar
            };
          });

          setData(fakeAccounts);
          setTotal(fakeTotal);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching accounts:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000); // 1-second delay
    };

    fetchAccounts();
  }, [token, currentPage, pageSize]);

  return { data, isLoading, isError, total };
};