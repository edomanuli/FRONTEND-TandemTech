import React from "react";
import axios from "axios";
import { useAuth } from "./AuthService";


const DeletePlanButton = ({ planInfoId }) => {
    const { authToken } = useAuth();

    const handlePlanDeletion = async () => {
        if (window.confirm("Are you sure you want to delete this plan from your account?")) {
            try {
                const response = await axios.delete(`https://localhost:5001/api/user/plans/${planInfoId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                alert("Plan deleted successfully.");
                console.log("Deleted plan: ", response.data);
            } catch (error) {
                console.error("Failed to delete plan: ", error.response ? error.response.data : "no response");
                alert("Failed to delete plan. Please try again.");
            }
        }
    };

    return (
        <button onClick={handlePlanDeletion}>Delete Plan</button>
    );
};


export default DeletePlanButton; // not fully implemented yet