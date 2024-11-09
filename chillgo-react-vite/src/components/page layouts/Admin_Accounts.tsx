// src/pages/AdminCustomer.tsx

import React, { useMemo, useState } from "react";
import { useGetProfile } from "../../hooks/useGetProfile"; // Adjust the import path
import { useGetAllAccount } from "../../hooks/useGetProfile"; // Adjust the import path
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Image, Pagination, PaginationProps } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { Customer } from "../../data/types";

const AdminCustomer: React.FC = () => {
  // Fetch user profile data using the mock hook
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();

  // Local state management
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch accounts data using the mock hook
  const {
    data: accounts,
    isLoading: accountsLoading,
    isError: accountsError,
    total,
  } = useGetAllAccount(profile?.user?.token || "", currentPage, pageSize);

  // Memoized and filtered account data
  const accountData = useMemo<Customer[]>(() => {
    if (!accounts) return [];

    // Clone the data to avoid mutating original
    let filtered = [...accounts];

    // Apply search filtering
    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          (customer.name &&
            customer.name.toLowerCase().includes(lowerSearchTerm)) ||
          (customer.email &&
            customer.email.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Sort by creation date descending
    filtered.sort(
      (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
    );

    return filtered;
  }, [accounts, searchTerm]);

  // Handlers for pagination
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle loading and error states
  if (profileLoading || accountsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#0055C3]">Loading...</p>
      </div>
    );
  }

  if (isError || accountsError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading data.
      </div>
    );
  }

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between mb-4">
        <div>{total.toLocaleString()} khách hàng</div>
        <div className="relative">
          <IoSearchOutline className="absolute top-1/2 transform -translate-y-1/2 left-3 w-6 h-6 text-gray-400" />
          <input
            type="search"
            className="rounded-md w-[463px] h-[57px] placeholder:pl-10 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0055C3]"
            placeholder="Tìm kiếm"
            name="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="my-2">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-[#0055C3] text-white text-center">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#ID</th>
              <th className="border border-gray-300 px-4 py-2">Tên</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Ngày tạo</th>
              <th className="border border-gray-300 px-4 py-2">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-black text-center">
            {accountData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  <p className="text-gray-500">No customers found.</p>
                </td>
              </tr>
            ) : (
              accountData.map((customer) => (
                <tr key={customer.accountId}>
                  <td className="border border-gray-300 px-4 py-3">
                    #{customer.accountId}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex justify-center items-center space-x-2">
                      <Image
                        src={customer.avatar || "/images/default-avatar.png"} // Fallback image
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {customer.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {format(new Date(customer.createAt), "HH:mm dd/MM/yyyy")}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <Link to={`/admin/customer/${customer.accountId}`}>
                      <button className="border rounded-md w-24 h-8 bg-[#0055C3] text-white hover:bg-white hover:text-[#0055C3] transition-colors duration-200">
                        Chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          className="mt-4 flex justify-center"
          showSizeChanger
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          current={currentPage}
          pageSize={pageSize}
          total={total} // Use total from mock hook
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </main>
  );
};

export default AdminCustomer;
