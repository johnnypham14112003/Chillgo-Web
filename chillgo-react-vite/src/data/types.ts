export interface DashboardData {
  revenue: number;
  revenueYesterday: number;
  totalOrders: number;
  totalOrdersYesterday: number;
  visiter: number;
  commission: number;
  commissionYesterday: number;
  totalProductsSold: number;
  totalProductsSoldYesterday: number;
  totalCustomer: number;
}

export interface WeeklyIncome {
  weekNumber: number;
  income: number;
}

export interface MonthlyIncomeData {
  month: string;
  totalIncome: number;
  weeklyIncomes: WeeklyIncome[];
}


export interface User {
  token: string;
  name: string;
  email: string;
  role: string; 
}

export interface Profile {
  user: User;
}


export interface Customer {
  accountId: string;
  name: string;
  email: string;
  createAt: string; 
  avatar: string;
}
