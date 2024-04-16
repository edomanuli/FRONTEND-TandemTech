import axios from "axios";


const UserPlan = async (authToken) => {
  if (!authToken) {
    console.error("No auth token available.");
    throw new Error(
      "Authentication token is required for fetching user plans."
    );
  }

  try {
    const response = await axios.get(`https://localhost:5001/api/user/plans`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user plans:", error);
    throw error;
  }
};

export { UserPlan };
