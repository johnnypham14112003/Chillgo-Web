// src/hooks/useGetDashboardData.ts

import { useState, useEffect } from "react";
import { DashboardData, MonthlyIncomeData, WeeklyIncome } from "./types";

interface UseGetDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  isError: boolean;
}

export const useGetDashboardData = (
  token: string | undefined,
  timeframe: string
): UseGetDashboardDataResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // Simulate an API call with a timeout
    const fetchData = () => {
      setIsLoading(true);
      setIsError(false);

      setTimeout(() => {
        try {
          // Generate fake data based on the selected timeframe
          const fakeData: DashboardData = generateFakeData(timeframe);
          setData(fakeData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000); // 1-second delay to simulate network latency
    };

    if (token) {
      fetchData();
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, [token, timeframe]);

  return { data, isLoading, isError };
};

// Helper function to generate fake data
const generateFakeData = (timeframe: string): DashboardData => {
  // You can customize the fake data based on the timeframe if needed
  return {
    revenue: getRandomNumber(5000, 20000),
    revenueYesterday: getRandomNumber(4000, 19000),
    totalOrders: getRandomNumber(100, 500),
    totalOrdersYesterday: getRandomNumber(80, 450),
    visiter: getRandomNumber(1000, 5000),
    commission: getRandomNumber(500, 2000),
    commissionYesterday: getRandomNumber(400, 1900),
    totalProductsSold: getRandomNumber(300, 1000),
    totalProductsSoldYesterday: getRandomNumber(250, 950),
    totalCustomer: getRandomNumber(50, 300),
  };
};

// Utility function to generate random numbers within a range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


interface UseGetMonthlyIncomeDataResult {
  data: MonthlyIncomeData[] | null;
  isLoading: boolean;
  error: boolean;
}

export const useGetMonthlyIncomeData = (
  token: string | undefined,
  selectedYear: number
): UseGetMonthlyIncomeDataResult => {
  const [data, setData] = useState<MonthlyIncomeData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Simulate an API call with a timeout
    const fetchData = () => {
      setIsLoading(true);
      setError(false);

      setTimeout(() => {
        try {
          if (!token) {
            throw new Error("Invalid token");
          }

          // Generate fake data based on the selected year
          const fakeData: MonthlyIncomeData[] = generateFakeMonthlyIncomeData(selectedYear);
          setData(fakeData);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching monthly income data:", err);
          setError(true);
          setIsLoading(false);
        }
      }, 1000); // 1-second delay to simulate network latency
    };

    fetchData();
  }, [token, selectedYear]);

  return { data, isLoading, error };
};

// Helper function to generate fake monthly income data
const generateFakeMonthlyIncomeData = (year: number): MonthlyIncomeData[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => ({
    month,
    totalIncome: getRandomNumber(50000, 200000), // Example income range
    weeklyIncomes: generateFakeWeeklyIncomes(),
  }));
};

// Helper function to generate fake weekly incomes
const generateFakeWeeklyIncomes = (): WeeklyIncome[] => {
  const weeks = 5; // Assuming a maximum of 5 weeks per month
  return Array.from({ length: weeks }, (_, i) => ({
    weekNumber: i + 1,
    income: getRandomNumber(10000, 50000), // Example weekly income range
  }));
};
