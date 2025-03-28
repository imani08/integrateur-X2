import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getSensorData = async () => {
  const response = await axios.get(`${API_URL}/sensors`);
  return response.data;
};

export const getSensors = async () => {
  const response = await axios.get(`${API_URL}/sensors/list`);
  return response.data;
};

export const getActuators = async () => {
  const response = await axios.get(`${API_URL}/actuators`);
  return response.data;
};

export const toggleActuator = async (id) => {
  const response = await axios.post(`${API_URL}/actuators/${id}/toggle`);
  return response.data;
};

export const getAlerts = async () => {
  const response = await axios.get(`${API_URL}/alerts`);
  return response.data;
};

export const getSystemSettings = async () => {
  const response = await axios.get(`${API_URL}/settings`);
  return response.data;
};

export const updateSystemSettings = async (settings) => {
  const response = await axios.post(`${API_URL}/settings`, settings);
  return response.data;
};