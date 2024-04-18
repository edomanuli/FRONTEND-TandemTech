import axios from "axios";

const supportedDevices = async (authToken) => {
  if (!authToken) {
    console.error("No auth token available.");
    throw new Error(
      "Authentication token is required for fetching user plans."
    );
  }

  try {
    const response = await axios.get(`https://localhost:5001/api/deviceInfo`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export { supportedDevices };
