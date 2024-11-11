// Library
import React, { useState, useEffect } from "react";

import { Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

// Component
import LoadingLoader from "../loaders/Loading";

// Utils
import {
  AccountStatsResponse,
  MonthlyChartData,
  TransactionStatsResponse,
} from "../../data/types";
import Format_Money from "../utils/Format_Money";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ================================================================================================
const Server_URL = import.meta.env.VITE_SERVER_URL;

const AdminDashboard: React.FC = () => {
  const [accountStats, setAccountStats] = useState<AccountStatsResponse>({
    "sum-account": 0,
    "sum-customer": 0,
    "sum-partner": 0,
    "sum-staff": 0,
    "sum-deleted": 0,
  });

  const [transactionStats, setTransactionStats] =
    useState<TransactionStatsResponse>({
      "total-transactions": 0,
      "total-amount": 0,
      "payment-method-stats": {
        transfer: 0,
        cash: 0,
      },
    });

  const [monthTransactionStats, setMonthTransactionStats] =
    useState<TransactionStatsResponse>({
      "total-transactions": 0,
      "total-amount": 0,
      "payment-method-stats": {
        transfer: 0,
        cash: 0,
      },
    });

  const [monthlyData, setMonthlyData] = useState<MonthlyChartData[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // =========================================[ Fetch Methods ]=========================================
  const fetchAccountStats = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt-token");
      const response = await fetch(`${Server_URL}/api/accounts/statistical`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: AccountStatsResponse = await response.json();
      setAccountStats(data);
    } catch (error) {
      console.error("Lỗi load dữ liệu thống kê tài khoản:", error);
    }
  };

  const fetchDailyStats = async (selectedDate: dayjs.Dayjs): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt-token");
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await fetch(
        `${Server_URL}/api/package-transaction/daily-statistic?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok && response.status === 400) {
        setTransactionStats({
          "total-transactions": 0,
          "total-amount": 0,
          "payment-method-stats": {
            transfer: 0,
            cash: 0,
          },
        });
        console.warn("Không có dữ liệu giao dịch cho ngày đã chọn.");
        return;
      }

      const data: TransactionStatsResponse = await response.json();
      setTransactionStats(data);
    } catch (error) {
      console.error("Lỗi load dữ liệu giao dịch ngày:", error);
    }
  };

  const fetchMonthlyStats = async (
    selectedDate: dayjs.Dayjs
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt-token");
      const monthlyStats: MonthlyChartData[] = [];

      // Fetch current month stats
      const currentDate = dayjs();
      const currentMonth = currentDate.month() + 1;
      const currentYear = currentDate.year();

      const currentMonthResponse = await fetch(
        `${Server_URL}/api/package-transaction/monthly-statistic?month=${currentMonth}&year=${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (currentMonthResponse.ok) {
        const currentData: TransactionStatsResponse =
          await currentMonthResponse.json();
        setMonthTransactionStats(currentData);
      }

      //Chart Data Query - 12 months
      const chartYear = selectedDate.year();
      for (let month = 1; month <= 12; month++) {
        // const date = selectedDate.subtract(i, "month");
        // const month = date.month() + 1;
        // const year = date.year();
        const date = dayjs()
          .year(chartYear)
          .month(month - 1); // Thiết lập tháng và năm bằng dayjs
        const year = date.year();

        const response = await fetch(
          `${Server_URL}/api/package-transaction/monthly-statistic?month=${month}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let monthData: MonthlyChartData;
        if (!response.ok && response.status === 400) {
          monthData = {
            month: date.format("MMM"),
            transactions: 0,
            amount: 0,
          };
          console.warn(
            `Không có dữ liệu giao dịch cho tháng ${month}/${year}.`
          );
        } else {
          // Nếu không có lỗi, xử lý dữ liệu bình thường
          const data: TransactionStatsResponse = await response.json();
          monthData = {
            month: date.format("MMM"),
            transactions: data["total-transactions"],
            amount: data["total-amount"],
          };
        }
        monthlyStats.push(monthData);
        setMonthlyData(monthlyStats);
      }
    } catch (error) {
      console.error("Lỗi load dữ liệu các tháng:", error);
      setMonthlyData([
        { month: selectedDate.format("MMM yyyy"), transactions: 0, amount: 0 },
        {
          month: selectedDate.subtract(1, "month").format("MMM yyyy"),
          transactions: 0,
          amount: 0,
        },
        {
          month: selectedDate.subtract(2, "month").format("MMM yyyy"),
          transactions: 0,
          amount: 0,
        },
      ]);
    }
  };
  // ===================================================================================================

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchAccountStats(),
        fetchDailyStats(selectedDate),
        fetchMonthlyStats(selectedMonth),
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate, selectedMonth]);

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Lượng giao dịch",
        data: monthlyData.map((item) => item.transactions),
        borderColor: "rgb(39, 118, 234)",
        tension: 0.1,
      },
      {
        label: "Số tiền (Trăm VND)",
        data: monthlyData.map((item) => item.amount / 100000),
        borderColor: "rgb(101, 229, 44)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Thống Kê Cả Năm",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingLoader displayText="Đang Tải..." />
      </div>
    );
  }
  // ===========================================================================================================================
  return (
    <div className="p-6">
      {/* Date Pickers */}
      <div className="mt-28 mb-6 flex justify-end gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày"
            views={["year", "month", "day"]}
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) {
                setSelectedDate(newValue);
              }
            }}
            className="w-48"
          />
          <DatePicker
            label="Chọn Tháng"
            views={["month", "year"]}
            value={selectedMonth}
            onChange={(newValue) => {
              if (newValue) {
                setSelectedMonth(newValue);
              }
            }}
            className="w-48"
          />
        </LocalizationProvider>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Account Statistics */}
        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Tổng Số Tài Khoản</h3>
          <p className="text-3xl text-blue-600">
            {accountStats["sum-account"]}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Khách Hàng</h3>
          <p className="text-3xl text-green-600">
            {accountStats["sum-customer"]}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Đối Tác</h3>
          <p className="text-3xl text-purple-600">
            {accountStats["sum-partner"]}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Nhân Viên</h3>
          <p className="text-3xl text-orange-600">
            {accountStats["sum-staff"]}
          </p>
        </Paper>

        {/* Transaction Statistics */}
        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Tổng Giao Dịch Trong Ngày
          </h3>
          <p className="text-3xl text-blue-600">
            {transactionStats["total-transactions"]}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Tổng Thu Nhập Trong Ngày
          </h3>
          <p className="text-3xl text-green-600">
            {Format_Money(transactionStats["total-amount"])}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Tổng Giao Dịch Trong Tháng
          </h3>
          <p className="text-3xl text-blue-600">
            {monthTransactionStats["total-transactions"]}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Tổng Thu Nhập Trong Tháng
          </h3>
          <p className="text-3xl text-green-600">
            {Format_Money(monthTransactionStats["total-amount"])}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Chuyển Khoản</h3>
          <p className="text-3xl text-purple-600">
            {transactionStats["payment-method-stats"]?.transfer || 0}
          </p>
        </Paper>

        <Paper elevation={2} className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Tiền Mặt</h3>
          <p className="text-3xl text-orange-600">
            {transactionStats["payment-method-stats"]?.cash || 0}
          </p>
        </Paper>
      </div>

      {/* Monthly Chart */}
      <Paper elevation={2} className="p-4">
        <Line data={chartData} options={chartOptions} className="h-[400px]" />
      </Paper>
    </div>
  );
};

export default AdminDashboard;
