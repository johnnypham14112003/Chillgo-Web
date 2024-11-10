// src/pages/AdminDashboard.tsx
import React, { useState } from "react";
// import { useGetDashboardData } from "../hooks/useGetDashboardData";
// import { useGetProfile } from "../hooks/useGetProfile";
import CustomerDisplay from "../admin-components/CustomerDisplay";
import IncomeBarChart from "../admin-components/IncomeBarChart";
import IncomeDisplay from "../admin-components/IncomeDisplay";
import OrderDisplay from "../admin-components/OderDisplay,";
import ProductDisplay from "../admin-components/ProductDisplay";
import CommissionDisplay from "../admin-components/CommissionDisplay";
import WebsiteDisplay from "../admin-components/WebsiteDisplay";
import { useGetDashboardData } from "../../data/admin";

const AdminDashboard: React.FC = () => {
  // Fetch user profile data
  //const { data: profile, isLoading: profileLoading, isError } = useGetProfile();

  // State for website data and selected timeframe
  const [websiteData, setWebsiteData] = useState<number>(89320);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Day");

  // Extract token from profile data
  const token = "profile?.user?.token";

  // Fetch dashboard data based on token and selected timeframe
  const { data: dashboardData, isLoading } = useGetDashboardData(
    token,
    selectedTimeframe
  );

  // Handler for changing the timeframe
  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  // Optional: Handle loading and error states
  //   if (profileLoading) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         Loading profile...
  //       </div>
  //     );
  //   }

  //   if (isError) {
  //     return (
  //       <div className="flex justify-center items-center h-screen text-red-500">
  //         Error loading profile.
  //       </div>
  //     );
  //   }

  return (
    <main className="flex-1 pt-32 pb-10 max-h-screen overflow-auto">
      <div className="flex space-x-3 px-2">
        {/* Left Section */}
        <div className="w-1/2">
          <div className="flex items-center justify-between p-3">
            <p className="text-black text-lg font-bold">Tổng quan</p>
            <select
              value={selectedTimeframe}
              onChange={handleTimeframeChange}
              className="bg-[#f7f7f7] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Day">Hôm nay</option>
              <option value="Week">Tuần này</option>
              <option value="Month">Tháng này</option>
              <option value="Year">Năm nay</option>
              <option value="AllTime">Toàn bộ</option>
            </select>
          </div>
          <div className="flex flex-wrap -mx-2">
            {/* First Column */}
            <div className="w-full md:w-1/2 px-2">
              <div className="p-2">
                <IncomeDisplay
                  income={dashboardData?.revenue}
                  lastincome={dashboardData?.revenueYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <OrderDisplay
                  totalOrders={dashboardData?.totalOrders}
                  totalOrdersyesterday={dashboardData?.totalOrdersYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <WebsiteDisplay
                  onWebsiteDataChange={setWebsiteData}
                  visitors={dashboardData?.visiter}
                  isLoading={isLoading}
                />
              </div>
            </div>
            {/* Second Column */}
            <div className="w-full md:w-1/2 px-2">
              <div className="p-2">
                <CommissionDisplay
                  commission={dashboardData?.commission}
                  commissionYesterday={dashboardData?.commissionYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <ProductDisplay
                  totalProductsSold={dashboardData?.totalProductsSold}
                  totalProductsSoldYesterday={
                    dashboardData?.totalProductsSoldYesterday
                  }
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <CustomerDisplay
                  totalCustomers={dashboardData?.totalCustomer}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-1/2">
          <div className="py-2">
            <IncomeBarChart token={token} />
          </div>
          {/* Optionally, include WebsiteVisitsChart or other components */}
          {/* <WebsiteVisitsChart websiteData={websiteData} /> */}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
