import React, { useState, useEffect, useMemo } from "react";
import { Pagination, Input, Modal, Button } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { AccountModel, AccountQueryResponse } from "../../data/types";

// ================================================================================================
const Server_URL = import.meta.env.VITE_SERVER_URL;

const Admin_Accounts: React.FC = () => {
    const [accountList, setAccountList] = useState<AccountQueryResponse[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedAccount, setSelectedAccount] = useState<AccountModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const token = localStorage.getItem("jwt-token");
  
    useEffect(() => {
      fetchAccounts();
    }, [currentPage, pageSize, searchTerm]);
  
    // Fetch accounts with searchTerm, pagination params
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${Server_URL}/api/accounts/list?keyword=${searchTerm}&gender=&role=&status=`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && data['data-list']) {
            setAccountList(data['data-list']);
            setTotal(data['total-count']);
          } else {
            console.error("Dữ liệu không hợp lệ từ API");
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        } finally {
          setLoading(false);
        }
    };
  
    // Handle pagination change
    const handlePageChange = (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    };
  
    // Handle search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to the first page when searching
    };
  
    // Handle account click to show details
    const handleAccountClick = (account: AccountModel) => {
      setSelectedAccount(account);
    };
  
    // Close modal
    const handleCloseModal = () => {
      setSelectedAccount(null);
    };
  
    // Handle delete account
    const handleDeleteAccount = async () => {
      if (!selectedAccount) return;
      try {
        const response = await fetch(`${Server_URL}/api/accounts`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "target-account-id": selectedAccount.id,
            "email": selectedAccount.email,
          }),
        });
  
        if (response.ok) {
          setAccountList(accountList.filter(acc => acc.id !== selectedAccount.id));
          setSelectedAccount(null);
          alert("Account deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    };
  
    // Handle update account
    const handleUpdateAccount = async () => {
      if (!selectedAccount) return;
      const updatedAccount = { ...selectedAccount, fullName: "Updated Name" }; // Example update
  
      try {
        const response = await fetch(`${Server_URL}/api/accounts/updating`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAccount),
        });
  
        if (response.ok) {
          setAccountList(accountList.map(acc => (acc.id === updatedAccount.id ? updatedAccount : acc)));
          setSelectedAccount(null);
          alert("Account updated successfully");
        }
      } catch (error) {
        console.error("Error updating account:", error);
      }
    };
  
    return (
      <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
        <div className="flex justify-between mb-4">
          <div>{total} tài khoản</div>
          <div className="relative">
            <IoSearchOutline className="absolute top-1/2 transform -translate-y-1/2 left-3 w-6 h-6 text-gray-400" />
            <Input
              type="search"
              className="rounded-md w-[463px] h-[57px] placeholder:pl-10 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0055C3]"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
  
        <div className="my-2">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#0055C3] text-white text-center">
              <tr>
                <th className="border px-4 py-2">#ID</th>
                <th className="border px-4 py-2">Tên</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="text-black text-center">
              {loading ? (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : accountList.length === 0 ? (
                <tr>
                  <td colSpan={5}>No accounts found</td>
                </tr>
              ) : (
                accountList.map(account => (
                  <tr key={account.id} onClick={() => handleAccountClick(account)}>
                    <td className="border px-4 py-3">#{account.id}</td>
                    <td className="border px-4 py-3">{account["full-name"]}</td>
                    <td className="border px-4 py-3">{account.email}</td>
                    <td className="border px-4 py-3">
                      <Button>Chi tiết</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
  
          <Pagination
            className="mt-4"
            showSizeChanger
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
          />
        </div>
  
        {selectedAccount && (
          <Modal
            title="Chi tiết tài khoản"
            visible={true}
            onCancel={handleCloseModal}
            footer={[
              <Button key="delete" danger onClick={handleDeleteAccount}>Xóa</Button>,
              <Button key="update" type="primary" onClick={handleUpdateAccount}>Cập nhật</Button>,
            ]}
          >
            <div>
              <p><strong>Id:</strong> {selectedAccount.id}</p>
              <p><strong>Firebase:</strong> ...</p>
              <p><strong>Tên:</strong> {selectedAccount.name}</p>
              <p><strong>Email:</strong> {selectedAccount.email}</p>
              <p><strong>Giới tính:</strong> ...</p>
              <p><strong>Địa chỉ:</strong> ...</p>
              <p><strong>SĐT:</strong> ...</p>
              <p><strong>Quyền cấp:</strong> {selectedAccount.role}</p>
              <p><strong>Trạng Thái:</strong> {selectedAccount.status}</p>
            </div>
          </Modal>
        )}
      </main>
    );
  };
  
  export default Admin_Accounts;