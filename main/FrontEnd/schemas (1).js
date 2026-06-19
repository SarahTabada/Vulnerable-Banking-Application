// Mock data for frontend testing - replace with real API calls later

export const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201'
  },
  memberSince: '2020-01-15'
};

export const mockAccounts = [
  {
    id: 1,
    type: 'Checking',
    accountNumber: '****1234',
    balance: 2547.83,
    availableBalance: 2547.83,
    nickname: 'Primary Checking'
  },
  {
    id: 2,
    type: 'Savings',
    accountNumber: '****5678',
    balance: 15420.50,
    availableBalance: 15420.50,
    nickname: 'Emergency Fund'
  },
  {
    id: 3,
    type: 'Credit Card',
    accountNumber: '****9012',
    balance: -1234.56,
    availableBalance: 8765.44,
    creditLimit: 10000.00,
    nickname: 'Rewards Card'
  }
];

export const mockTransactions = [
  {
    id: 1,
    accountId: 1,
    date: '2024-10-20',
    description: 'Direct Deposit - Salary',
    amount: 3500.00,
    type: 'credit',
    category: 'Income',
    status: 'completed'
  },
  {
    id: 2,
    accountId: 1,
    date: '2024-10-19',
    description: 'Target Store #1234',
    amount: -89.47,
    type: 'debit',
    category: 'Shopping',
    status: 'completed'
  },
  {
    id: 3,
    accountId: 1,
    date: '2024-10-18',
    description: 'Gas Station - Shell',
    amount: -45.20,
    type: 'debit',
    category: 'Transportation',
    status: 'completed'
  },
  {
    id: 4,
    accountId: 2,
    date: '2024-10-17',
    description: 'Transfer from Checking',
    amount: 500.00,
    type: 'credit',
    category: 'Transfer',
    status: 'completed'
  },
  {
    id: 5,
    accountId: 1,
    date: '2024-10-16',
    description: 'Electric Bill - TXU Energy',
    amount: -156.78,
    type: 'debit',
    category: 'Utilities',
    status: 'completed'
  },
  {
    id: 6,
    accountId: 3,
    date: '2024-10-15',
    description: 'Amazon Purchase',
    amount: -67.99,
    type: 'debit',
    category: 'Shopping',
    status: 'pending'
  }
];

export const mockPayees = [
  {
    id: 1,
    name: 'TXU Energy',
    type: 'utility',
    accountNumber: 'ELEC123456',
    lastPayment: '2024-09-15',
    averageAmount: 156.78
  },
  {
    id: 2,
    name: 'City of Dallas Water',
    type: 'utility',
    accountNumber: 'WATER789',
    lastPayment: '2024-09-10',
    averageAmount: 45.20
  },
  {
    id: 3,
    name: 'Capital One Credit Card',
    type: 'credit_card',
    accountNumber: '****4567',
    lastPayment: '2024-10-01',
    averageAmount: 250.00
  }
];

export const mockTransferHistory = [
  {
    id: 1,
    fromAccount: mockAccounts[0],
    toAccount: mockAccounts[1],
    amount: 500.00,
    date: '2024-10-17',
    status: 'completed',
    type: 'internal'
  },
  {
    id: 2,
    fromAccount: mockAccounts[0],
    toAccount: { type: 'External', accountNumber: '****9876', nickname: 'Chase Checking' },
    amount: 200.00,
    date: '2024-10-10',
    status: 'completed',
    type: 'external'
  }
];

// Utility functions for mock data
export function getAccountById(id) {
  return mockAccounts.find(account => account.id === id);
}

export function getTransactionsByAccountId(accountId) {
  return mockTransactions.filter(transaction => transaction.accountId === accountId);
}

export function getRecentTransactions(limit = 5) {
  return mockTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export function getTotalBalance() {
  return mockAccounts
    .filter(account => account.type !== 'Credit Card')
    .reduce((total, account) => total + account.balance, 0);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}