import axios from 'axios';

// Configura la URL base de tu API NestJS
const API_BASE_URL = 'http://localhost:3001/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funciones para realizar las peticiones a tu backend

// Registrar cliente
export const registerClient = async (data: any) => {
  return api.post('/wallet/register', data);
};

// Recargar billetera
export const rechargeWallet = async (data: any) => {
  return api.post('/wallet/recharge', data);
};

// Hacer pago y recibir token
export const makePayment = async (data: any) => {
  return api.post('/wallet/payment', data);
};

// Confirmar el pago con token
export const confirmPayment = async (data: any) => {
  return api.post('/wallet/payment/confirm', data);
};

// Consultar saldo
export const checkBalance = async (data: any) => {
  return api.get('/wallet/balance/' + data.document + '/' + data.phone);
};
