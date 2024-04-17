import axios from "axios";
import { useAuth } from "./useAuth";

const DeleteDeviceButton = ({ deviceId }) => {
  const { authToken } = useAuth();

  const handleDeviceDeletion = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this device from your account?"
      )
    ) {
      try {
        const response = await axios.delete(
          `https://localhost:5001/api/user/devices/${deviceId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        alert("Device deleted successfully.");
        console.log("Deleted device: ", response.data);
      } catch (error) {
        console.error(
          "Failed to delete device: ",
          error.response ? error.response.data : "no response"
        );
        alert("Failed to delete device. Please try again.");
      }
    }
  };

  return <button onClick={handleDeviceDeletion}>Delete Device</button>;
};

export default DeleteDeviceButton;
