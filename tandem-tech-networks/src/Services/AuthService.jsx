import axios from "axios";

const api = "https://localhost:5001/api";

export const userRegistration = async (userInfo) => {
  try {
    const response = await axios.post(`${api}/user/register`, userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response}`);
      alert(`Registration failed: ${error.response}`);
    } else if (error.request) {
      console.error(`Error request: ${error.request}`);
      alert("No response from the server.");
    } else {
      console.error(`Error: ${error.message}`);
      alert(`Registration failed: ${error.message}`);
    }
  }
};

export const allPlans = async () => {
  try {
    const response = await axios.get(`${api}/planinfo/1`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.data}`);
      alert(`Failed to fetch plans: ${error.response.data}`);
    } else if (error.request) {
      console.error(`Error request: ${error.request}`);
      alert("No response from the server.");
    } else {
      console.error(`Error: ${error.message}`);
      alert(`Failed to fetch plans: ${error.message}`);
    }
  }
};
