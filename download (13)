//Banking API calls - update endpoints when backend ready
import axios from 'axios'

// Base API configuration
const API_BASE = '/api';

// Authentication APIs
export async function authenticateUser(credentials) {
  try {
    // For local/demo use the demo_login endpoint which checks DB seeded users
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(`${API_BASE}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Account APIs
export async function fetchUserAccounts() {
  try {
    const response = await axios.get(`${API_BASE}/accounts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

export async function fetchAccountDetails(accountId) {
  try {
    const response = await axios.get(`${API_BASE}/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account details:', error);
    throw error;
  }
}

// Transaction APIs
export async function fetchTransactions(accountId, options = {}) {
  try {
    const params = new URLSearchParams();
    if (accountId) params.append('accountId', accountId);
    if (options.startDate) params.append('startDate', options.startDate);
    if (options.endDate) params.append('endDate', options.endDate);
    if (options.limit) params.append('limit', options.limit);
    
    const response = await axios.get(`${API_BASE}/transactions?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

export async function fetchTransactionDetails(transactionId) {
  try {
    const response = await axios.get(`${API_BASE}/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
}

// Transfer APIs
export async function createTransfer(transferData) {
  try {
    const response = await axios.post(`${API_BASE}/transfers/create`, transferData);
    return response.data;
  } catch (error) {
    console.error('Error creating transfer:', error);
    throw error;
  }
}

export async function fetchTransferHistory(options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.startDate) params.append('startDate', options.startDate);
    if (options.endDate) params.append('endDate', options.endDate);
    if (options.limit) params.append('limit', options.limit);
    
    const response = await axios.get(`${API_BASE}/transfers/history?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transfer history:', error);
    throw error;
  }
}

// Bill Pay APIs
export async function fetchPayees() {
  try {
    const response = await axios.get(`${API_BASE}/payees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payees:', error);
    throw error;
  }
}

export async function createPayment(paymentData) {
  try {
    const response = await axios.post(`${API_BASE}/payments/create`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

export async function fetchPaymentHistory(options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.startDate) params.append('startDate', options.startDate);
    if (options.endDate) params.append('endDate', options.endDate);
    if (options.limit) params.append('limit', options.limit);
    
    const response = await axios.get(`${API_BASE}/payments?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
}

// User Profile APIs
export async function fetchUserProfile() {
  try {
    const response = await axios.get(`${API_BASE}/user/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(profileData) {
  try {
    const response = await axios.put(`${API_BASE}/user/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Legacy test function - keep for now
export async function fetchHelloMessage() {
  try {
    const response = await axios.get('/api/testing_connection')
    return response.data.message
  } catch (error) {
    console.error('Error fetching /api/testing_connection:', error)
    throw error
  }
}