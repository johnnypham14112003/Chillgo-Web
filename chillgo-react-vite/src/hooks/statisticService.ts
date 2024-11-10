// //=====================[ Declare ]======================
// const Server_URL = import.meta.env.VITE_SERVER_URL;

// export const fetchAccountStats = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/accounts/statistical', {
//         headers: {
//           'Authorization': `Bearer ${getToken()}`
//         }
//       });
//       const data = await response.json();
//       setAccountStats(data);
//     } catch (error) {
//       console.error('Error fetching account stats:', error);
//     }
//   };
  
// export const fetchTransactionStats = async () => {
//     try {
//       const url = viewType === 'daily' 
//         ? `http://localhost:5000/api/package-transaction/daily-statistic?date=${format(selectedDate, 'yyyy-MM-dd')}`
//         : `http://localhost:5000/api/package-transaction/monthly-statistic?month=${selectedDate.getMonth() + 1}&year=${selectedDate.getFullYear()}`;
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${getToken()}`
//         }
//       });
//       const data = await response.json();
//       setTransactionStats(data);
//     } catch (error) {
//       console.error('Error fetching transaction stats:', error);
//     }
//   };