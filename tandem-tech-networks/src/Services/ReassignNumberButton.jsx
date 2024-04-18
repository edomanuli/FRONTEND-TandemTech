import axios from "axios";

const reassignNumberButton = async (currentDeviceId, assignedNumberId, authToken) => {

  try {
    const response = await axios.put(
      `https://localhost:5001/api/user/devices/${currentDeviceId}`,
      {
        assignedNumberId: assignedNumberId
        // newDeviceId: newDeviceId,
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to reassign number: ${error}`);
    throw error;
  }
};

export default reassignNumberButton;
