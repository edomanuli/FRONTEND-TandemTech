import axios from 'axios';

const fetchUserBill = async (authToken) => {
    if (!authToken) {
        console.error("No auth token available.");
        throw new Error("Authentication token is required for fetching user bill.");
    }

    try {
        const response = await axios.get(`https://localhost:5001/api/user/bill`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user bill:", error);
        throw error;
    }
};


export { fetchUserBill };