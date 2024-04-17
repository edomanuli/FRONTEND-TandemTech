import axios from "axios";
import { useAuth } from "./useAuth";

const AddPlanButton = ({ planInfoId, onPlanAdd }) => {
  const { authToken } = useAuth();

  const handleAddPlanClick = async () => {
    if (!authToken) {
      alert("You must be logged in to add a plan.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:5001/api/user/plans",
        { planInfoId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Plan added successfully!");
      console.log("Response: ", response.data);
    } catch (error) {
      alert("An error occurred while adding the plan.");
      onPlanAdd();
      console.error(
        "Error: ",
        error.response ? error.response.data : "No response"
      );
    }
  };

  return <button className="add-plan-button" onClick={handleAddPlanClick}>Add Plan</button>;
};

export default AddPlanButton;
