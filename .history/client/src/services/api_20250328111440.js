const API_URL = "https://api.example.com";

export const fetchSensors = async () => {
  const response = await fetch(`${API_URL}/sensors`);
  return response.json();
};

export const fetchActuators = async () => {
  const response = await fetch(`${API_URL}/actuators`);
  return response.json();
};

export const fetchAlerts = async () => {
  const response = await fetch(`${API_URL}/alerts`);
  return response.json();
};