import axios from "axios";

const fetchUserDevices = async (authToken) => {
  if (!authToken) {
    console.error("No auth token available.");
    throw new Error(
      "Authentication token is required for fetching user devices."
    );
  }

  try {
    const response = await axios.get(
      `https://localhost:5001/api/user/devices`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user devices:", error);
    throw error;
  }
};

export { fetchUserDevices };
