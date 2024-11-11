export interface SignupPayload {
  "full-name": string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AccountInfo {
  id: string;
  "firebase-uid": string;
  email: string;
  "avatar-url": string;
  "full-name": string;
  "phone-number": string | null;
  cccd: string | null;
  gender: string | null;
  role: string;
  status: string;
}

export interface LoginResponse {
  "jwt-token": string;
  "account-info": AccountInfo;
}

// ====================================================================================
export interface AccountStatsResponse {
  "sum-account": number;
  "sum-customer": number;
  "sum-partner": number;
  "sum-staff": number;
  "sum-deleted": number;
}

export interface PaymentMethodStats {
  transfer: number;
  cash: number;
}

export interface TransactionStatsResponse {
  "total-transactions": number;
  "total-amount": number;
  "payment-method-stats": PaymentMethodStats;
}

export interface MonthlyChartData {
  month: string;
  transactions: number;
  amount: number;
}
// ====================================================================================
export interface AccountModel {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface AccountQueryResponse {
  id: string;
  "firebase-uid": string;
  email: string;
  "avatar-url": string;
  "full-name": string;
  "phone-number": string;
  cccd: string;
  gender: string;
  role: string;
  status: string;
}
// ====================================================================================
export interface Customer {
  accountId: string;
  name: string;
  email: string;
  createAt: string;
  avatar: string;
}

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
